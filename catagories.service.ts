import { CACHE_MANAGER, ConflictException, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { CategoryRepository } from "./categories.repository";
import { Category } from './category.entity';
import { CategoryDTO } from './dto/category.dto';
import { NotNullException } from '../common/notnull.exception';
import { Product } from '../products/product.entity';
import { ProductRepository } from "../products/product.repository";
import { ProductDTO } from '../products/Productdto/Product.dto';
import { messages } from './category.constant';
//import { MailService } from 'src/mail/mail.service';
import { LazyModuleLoader } from '@nestjs/core';
import { Cache } from 'cache-manager';
//import { MailModule } from '../mail/mail.module';
/**
 * category service
 */
@Injectable()
export class CatagoriesService {
  logger = new Logger()

  //private categoriesDTO=[];
  /**
* category repo
*condtructor used
*/
  constructor(private categoryRepo: CategoryRepository,
    private ProductsRepo:ProductRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private lazyModuleLoader: LazyModuleLoader
    // @InjectRepository(Category) private categoryRepo: Repository<Category>,
    //private mailService:MailService
    //@InjectRepository(Product) private ProductsRepo: Repository<Product>,
   ) {
    console.log("In Services")
  }
  /**
   * get category from db
   * @returns list of category
   */
  async fetchAllCategories(): Promise<CategoryDTO[]> {
    // let res= await this.categoryRepo.find({select:{categoryName:true}});
    //let res = await this.categoryRepo.find({select:['id', 'categoryName', 'addedBy'], order: {categoryName: 'ASC'},where: {product: {price: Between(1, 123)}}});
    //let res = await this.categoryRepo.find({select:['id', 'categoryName', 'addedBy'], order: {categoryName: 'ASC'}});
    console.log("In Service")
    let cachedData: CategoryDTO[] = await this.cacheManager.get('Category-list');
    console.log(cachedData)
    if (cachedData) {
      return cachedData;
    } else {
      let res = await this.categoryRepo.categoryDetail();

      let { MailModule } = await import("../mail/mail.Module");
      let MailModuleRef = await this.lazyModuleLoader.load(() => MailModule);
      let { MailService } = await import("../mail/mail.service");
      let MailServiceRef = await MailModuleRef.get(MailService);

      if (res.length === 0) {//throw new HttpException('No Data found',HttpStatus.NOT_FOUND)
        /* throw new HttpException({
           status:HttpStatus.NOT_FOUND,
           error:'No Data found'},HttpStatus.NOT_FOUND)*/
        const CATEGORY_NOT_FOUND = 'Category not found';
        //this.mailService.getMessage(CATEGORY_NOT_FOUND);
        MailServiceRef.getMessage(CATEGORY_NOT_FOUND)
        this.logger.error(messages.notFound);
        throw new NotFoundException(HttpStatus.NOT_FOUND,
          messages.notFound)



      } else {
        await this.cacheManager.set('Category-list', res)
        //this.mailService.sendmail('dia@hcl.com','sa@hcl.com','testig','testingin body resuable service');
        MailServiceRef.sendmail('dia@hcl.com', 'sa@hcl.com', 'testig', 'testingin body resuable service');
        this.logger.log("Category fetched sucessfully");
      }
      return res;
      //   return await this.categoryRepo.find({select:{categoryName:true}});
    }
  }
  /**
   * create new category
   * @param categoryDTO create new category
   * @returns category id
   */
  async addCategory(categoryDTO: CategoryDTO): Promise<CategoryDTO> {
    /**done exceptional handling */
    try {

      let res = await this.categoryRepo.save(categoryDTO);
      await this.cacheManager.del('Category-list');
      return res;

    } catch (Error: any) {
      console.log(Error)
      if (Error.code === '23505') {
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          message: "Category already exist"
        })
      } else if (Error.code === '23502') {
        throw new NotNullException("Category name should not be null")
      }
      else {
        throw new InternalServerErrorException()
      }
    }
  }

  /**
   * fetch category based on id
   * @param id category id
   * @returns category 
   */
  async getbyCategoryid(id: number): Promise<CategoryDTO> {
    /**console pipes */
    console.log("in services")
    let res = await this.categoryRepo.findOneBy({ id: id })
    if (!res) {
      throw new HttpException('Category not found for given id', HttpStatus.NOT_FOUND)
    }
    return res;
  }
  /**
   * update category based on id
   * @param categoryDTO database
   * @param id category id
   * @returns category 
   */
  async updateCategory(categoryDTO: CategoryDTO, id: number): Promise<CategoryDTO> {
    const todo = await this.categoryRepo.findOneOrFail({
      where: { id }
    });
    if (!todo.id) {
      /**provided updation */
      console.error("Todo doesn't exist");
    }
    /**provided updation  by id*/
    await this.categoryRepo.update(id, categoryDTO);
    return await this.categoryRepo.findOne({
      where: { id }
    });

    //return await this.categoryRepo.update(id,categoryDTO)
  }
  /**
   * 
   * @param id delete category based on id
   * @returns category
   */
  async deleteCategory(id: number) {
    let result = await this.categoryRepo.delete({ id: id })

    if (!result) {
      throw new HttpException('Not category id found', HttpStatus.NOT_FOUND)

    } else if (result.affected > 0) {
      await this.cacheManager.reset();
    }

  }


  //task 1/09
  /**
 * 
 * @param id getCategoryWithProducts
 * @returns category
 */

  async getCategoryWithProducts() {
    let res = await this.categoryRepo.find({ relations: ['product'] });//left join
    //await this.categoryRepo.createQueryBuilder()
    if (res.length > 0) {
      return res;
    }
    else {
      throw new NotFoundException();
    }
  }
  /**Add category with products  */
  async addCategoryWithproduct(categoriesDTO: CategoryDTO) {
    if (categoriesDTO && !categoriesDTO.product) {
      throw new HttpException('Not allowed to add Category without Product', HttpStatus.NOT_ACCEPTABLE)

    } else if (!categoriesDTO) {
      throw new HttpException('Not allowed to add Product without category', HttpStatus.NOT_ACCEPTABLE)
    } else {

      let productRes = await this.ProductsRepo.save(categoriesDTO.product)

      let res = await this.categoryRepo.save({ ...categoriesDTO, product: productRes })
      return res;
    }
  }
/** */

  /**search by  category with products  */
  async searchByCategoryName(categoryName: string) {
    return await this.categoryRepo.find({ where: { categoryName: Like(`%${categoryName}%`) } });

  }
  /**
   * delete category and set product null
   */

  async removeCategorySetNullInProduct(id: number) {
    let res = await this.categoryRepo.findOne({
      where: { id: id }
    });
    if (!res) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)

    }
    let effectedresponse = await this.categoryRepo.delete({ id: res.id })
    if (effectedresponse.affected === 1) {
      return { message: 'Category deleted sucessdully', status: HttpStatus.OK }

    } else {
      return { message: 'Something went wrong try after sometime', status: HttpStatus.EXPECTATION_FAILED }
    }
  }
  /** addProductWithExistingCategory*/



  async addProductWithExistingCategory(ProductDTO: ProductDTO) {
    let checkCategoryexistingornot = await this.categoryRepo.findOne({
      where: { id: ProductDTO.id }
    });
    if (!checkCategoryexistingornot) {
      throw new HttpException('Category  id not found', HttpStatus.NOT_FOUND)

    }
    ProductDTO.category = checkCategoryexistingornot
    let addres = await this.ProductsRepo.save(ProductDTO)

    return { response: addres, message: 'Product added sucessdully', status: HttpStatus.OK }
  }

  /**delete category along with product */
  async deleteCategoryAlongWithProduct(id: number) {
    let res = await this.categoryRepo.findOne({
      where: { id: id }
    });
    if (!res) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)

    }
    let effectedresponse = await this.categoryRepo.delete({ id: res.id })
    if (effectedresponse.affected === 1) {
      return { message: 'Category deleted sucessdully along with product', status: HttpStatus.OK }

    } else {
      return { message: 'Something went wrong try after sometime', status: HttpStatus.EXPECTATION_FAILED }
    }
  }


  /**delete product  */
  /**
* 
* @param id delete Product based on id
* @returns Product
*/
  async deleteProductId(id: number) {
    let result = await this.ProductsRepo.delete({ id: id })
    if (!result) {
      throw new HttpException('Not Product id found', HttpStatus.NOT_FOUND)

    } else return result;

  }
  /**delete product id  for existing category */
  async deleteProductIdForExistingCategory(id: number) {
    let res = await this.categoryRepo.findOne({
      where: { id: id }
    });
    if (!res) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

    }
    let effectedresponse = await this.ProductsRepo.delete({ id: res.id })
    if (effectedresponse.affected === 1) {
      return { message: 'Product deleted sucessfully', status: HttpStatus.OK }

    } else {
      return { message: 'something went wrong try after sometime', status: HttpStatus.EXPECTATION_FAILED }
    }
  }

  /**
   * add category with  product
   * @param ProductDTO 
   * @returns 
   */
  async addCategoryAddWithproduct(ProductDTO: ProductDTO) {
    //let id:number=ProductDTO.id
    let caetegoryDetails = await this.categoryRepo.findOne({
      where: { id: ProductDTO.id }
    });
    //const caetegoryDetails=await this.categoryRepo.categoryDetail(id)
    if (!caetegoryDetails) {
      throw new NotFoundException({ status: HttpStatus.NOT_FOUND, message: 'Not found' })

    } else {
      let productResp = await this.ProductsRepo.save(ProductDTO)
      //  let update=await this.ProductsRepo.update(productResp.id,{category:ProductDTO.category})
      return productResp;
    }
  }

}

/*
import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryDTO } from './dto/category.dto';
import {InjectRepository}from '@nestjs/typeorm';
import {Repository}from 'typeorm';

@Injectable()
export class CatagoriesService {
    //private categoriesDTO=[];
constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>){}

   async fetchAllCategories(): Promise<CategoryDTO[]> {
    return await this.categoryRepo.find({select:{categoryName:true}});
     //   return await this.categoryRepo.find({select:{categoryName:true}});//in profucts
    }
   async addCategory(categoryDTO:CategoryDTO) :Promise<CategoryDTO>{
        return await this.categoryRepo.save(categoryDTO);
    }
    async getbyCategoryid(id:number):Promise<CategoryDTO>{
        return await this.categoryRepo.findOneBy({id: id})
    }
    async updateCategory(categoryDTO:CategoryDTO,id:number):Promise<CategoryDTO>{
     const todo = await this.categoryRepo.findOneOrFail({
        where: { id }
      });
     if (!todo.id) {

       console.error("Todo doesn't exist");
     }
     await this.categoryRepo.update(id, categoryDTO);
     return await this.categoryRepo.findOne({
        where: { id }
      });
    
  
    }
    async deleteCategory(id:number){
        return await this.categoryRepo.delete({id:id})
      
    }
}
*/
