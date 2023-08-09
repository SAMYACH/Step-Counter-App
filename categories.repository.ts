import { Injectable } from '@nestjs/common';
import { Any, DataSource, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryDTO } from './dto/category.dto';
@Injectable()
export class CategoryRepository extends Repository<Category>{
    constructor(private dataSource: DataSource) {
        super(Category, dataSource.createEntityManager());
    }
    async categoryDetail():Promise<CategoryDTO[]>{
     //   console.log(this)
        //return await this.query(`SELECT * from public.categories where id-'${id}'`);
        return await this.query("select id, category_name from public.categories");
    }
    /**async categoryDetail(id:number) {
        console.log(this)
        //return await this.query(`SELECT * from public.categories where id-'${id}'`);
        return await this.query("select id, category_name from public.categories");
    }*/
    
}


