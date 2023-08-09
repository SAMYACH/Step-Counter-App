import { UseInterceptors, Body, Controller, Delete, ForbiddenException, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, UseFilters, UsePipes, ValidationPipe, UseGuards, Version, CacheInterceptor, CacheTTL } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiInternalServerErrorResponse, ApiCreatedResponse, ApiResponse, ApiNotFoundResponse, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { CatagoriesService } from './catagories.service';
import { HttpExceptionFilter } from '../common/exception.filter';
import { CategoryDTO } from "./dto/category.dto";
import { ResponseInterceptor } from "../common/Interceptor/response-Interceptor.interceptor";
import { ProductDTO } from '../products/Productdto/Product.dto';
import { JwtAuthGuard } from '../User/guards/jwt-auth-guard';
import { RolesGuard } from '../User/guards/roles.guards';
import { Role } from '../User/role.enum';
import { Roles } from '../User/decorators/roles.decorators';

/**
 * Controller responds to inbound HTTP Requests and produces HTTP Responses.
 */
@ApiHeader({
    name: 'V-header-name',
    enum: ['4'],
    description: 'Specify Version Number'

})
@UseFilters(new HttpExceptionFilter())
//@UsePipes(new ValidationPipe())
//@UseInterceptors(CacheInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseInterceptors(ResponseInterceptor)
@ApiTags('categories')
@Controller({
    path: 'categories',
    version: '4'
})
export class CategoriesController {
    constructor(private categoriesServices: CatagoriesService,
        @Inject('GREET') greet: string,
        @Inject('NUMBERLIST') numberlist: Array<number>,
        //@Inject('USER_LIST') userlist:any
    ) {
        console.log(greet);
        console.log(numberlist);
        // console.log(userlist);

    }
    /**
     * for fetch all record from categories
     * @returns  list of category
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Category Fetched Sucessfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'This is a internel server error.try again later ' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: "No data found" })
    //@UseFilters(new HttpExceptionFilter())
    @CacheTTL(30)
    @Get()
    async listCategories(): Promise<CategoryDTO[]> {
        console.log("In Controller")
        return await this.categoriesServices.fetchAllCategories()
    }
    /**
     * create new category
     * @param CategoryDTO specify category name
     * @returns newly created category
     */
    @ApiOkResponse({ status: HttpStatus.CREATED, description: 'Category Added Sucessfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'This is a internel server error.try again later ' })

    @Post()
    async Createcategory(@Body(new ValidationPipe()) CategoryDTO: CategoryDTO): Promise<CategoryDTO> {
        return await this.categoriesServices.addCategory(CategoryDTO)
    }
    /**
     * list category based on id
     * @param id category id
     * @returns category
     */
    @ApiCreatedResponse({ status: HttpStatus.OK, description: 'Category Fetched Sucessfully for id' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'This is a internel server error.try again later ' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: "No data found for given id" })
    //@UseFilters(new HttpExceptionFilter())
    @Get(':id')
    async getbyCategoryid(@Param('id', ParseIntPipe) id: number): Promise<CategoryDTO> {
        console.log("In controller")
        return await this.categoriesServices.getbyCategoryid(id);
    }
    /**
     * update category based on category
     * @param CategoryDTO update 
     * @param id category id
     * @returns updated
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Updated Sucessfully' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'This is a internel server error.try again later ' })
    @Put(':id')

    updatecategory(@Body() CategoryDTO: CategoryDTO, @Param('id') id: number): Promise<CategoryDTO> {
        return this.categoriesServices.updateCategory(CategoryDTO, id)
        //return CategoryDTO;
    }
    /**
     * delete category based on id
     * @param id category id
     * @returns no of effected rows
     */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Deleted Sucessfully' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'Category Not Found' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'This is a internel server error.try again later ' })
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')

    deletecategory(@Param('id') id: number) {
        return this.categoriesServices.deleteCategory(id);
    }
    /**task 1/09*/
    @Get('all/products')
    async getCategoryWithProducts() {
        return this.categoriesServices.getCategoryWithProducts();

    }

    /**adding category with product
     * give error if product not entered*/
    @ApiHeader({
        name: 'V-header-name',

    })
    @Version('6')
    @Post('/products')
    async addCategoryWithproduct(@Body() CategoryDTO: CategoryDTO) {
        return await this.categoriesServices.addCategoryWithproduct(CategoryDTO)
    }

    /**search by category name entered*/
    @ApiHeader({
        name: 'V-header-name',
        enum: ['1', '2', '3'],
        description: 'Specify Version Number'

    })
    @Version(['1', '2', '3'])
    @Get('/cat/:categoryName')
    async searchByCategoryName(@Param('categoryName') categoryName: string) {

        return this.categoriesServices.searchByCategoryName(categoryName)
    }

    @ApiCreatedResponse({ status: HttpStatus.OK, description: 'Add product with existing category' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
    @Post('/addproducts')
    async addProductWithExistingCategory(@Body() ProductDTO: ProductDTO) {
        // return this.categoriesServices.addProductWithExistingCategory(CategoryDTO) 
        return await this.categoriesServices.addProductWithExistingCategory(ProductDTO)
    }


    /**delete category along with product set null */
    @Delete('del-cat/:id')
    @ApiCreatedResponse({ status: HttpStatus.OK, description: 'Delete category and set product null' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden ' })
    async removeCategorySetNullInProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.categoriesServices.removeCategorySetNullInProduct(id)
    }
    /**delete category along with product */
    @Delete('del-catproduct/:id')
    @ApiCreatedResponse({ status: HttpStatus.OK, description: 'Delete category and set product deleted' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden ' })
    async deleteCategoryAlongWithProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.categoriesServices.deleteCategoryAlongWithProduct(id)
    }

    /**delete Product id */
    @ApiOkResponse({ status: HttpStatus.OK, description: 'Product Deleted Sucessfully' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'Product Not Found' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'This is a internel server error.try again later ' })

    @Delete('del-product/:id')

    deleteProductId(@Param('id') id: number) {
        return this.categoriesServices.deleteProductId(id);
    }


    /**delete product id for existing category */
    @Delete('del-productidexitcat/:id')
    @ApiCreatedResponse({ status: HttpStatus.OK, description: 'Delete Product for exciting category' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden ' })
    async deleteProductIdForExistingCategory(@Param('id', ParseIntPipe) id: number) {
        return await this.categoriesServices.deleteProductIdForExistingCategory(id)
    }
    /**give error if product not entered*/
    @Post('/cat-products')
    async addCategoryAddWithproduct(@Body() ProductDTO: ProductDTO) {
        return await this.categoriesServices.addCategoryAddWithproduct(ProductDTO)
    }

}
/** 

//25 aug task
/*
import { Body, Controller,Delete,Get,Param,Post,Put } from '@nestjs/common';
import { CatagoriesService } from './catagories.service';
import{CategoryDTO } from "./dto/category.dto";

@Controller('categories')
export class CategoriesController{
    constructor (private categoriesServices:CatagoriesService){

    }
    @Get()
   async listCategories():Promise<CategoryDTO[]>{
        return await this.categoriesServices.fetchAllCategories()
    }
    @Get(':id')
    async getbyCategoryid(@Param('id') id: number):Promise<CategoryDTO>
     {   return await this.categoriesServices.getbyCategoryid(id) ;   }
    
    @Post()
      async  Createcategory(@Body() CategoryDTO: CategoryDTO):Promise<CategoryDTO>{
            return await this.categoriesServices.addCategory(CategoryDTO) 
        }
    
    @Put(':id')
    
        updatecategory(@Body() CategoryDTO: CategoryDTO, @Param('id') id: number):Promise<CategoryDTO>{
            return this.categoriesServices.updateCategory(CategoryDTO,id) 
            //return CategoryDTO;
        }
    
     @Delete(':id')
    
        deletecategory(@Param('id') id: number)

        {   return this.categoriesServices.deleteCategory(id); 
            }
    
}
*/