import { Product } from "../products/product.entity";
import{Column,CreateDateColumn,DeleteDateColumn,PrimaryGeneratedColumn,Entity, OneToMany} from "typeorm";
/**entity created for category */
@Entity('categories')
export class Category{
  /**primary created for category */
    @PrimaryGeneratedColumn()
    id:number;
    @Column({name:'category_name',type:'varchar',unique:true,length:20,nullable:false})
    categoryName:string;
    @Column({name:'isActive',type:'varchar',length:1,default:'y'})
    isActive:string
    @Column({name:'added_by',nullable:true})
    addedBy:string
    @CreateDateColumn()
    createdDate:Date;
    @DeleteDateColumn()
    deletedDate:Date;
    /**length created for category */
  @OneToMany(()=>Product,(product)=>product.category,{
    cascade:true,
    onDelete:"CASCADE"})
  product:Product[]

}