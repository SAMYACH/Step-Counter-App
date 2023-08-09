
import { Category } from "../catagories/category.entity";
import{Column,CreateDateColumn,DeleteDateColumn,PrimaryGeneratedColumn,Entity, ManyToOne} from "typeorm";

/**
 * entity pruduct
 */
@Entity('product')
export class Product{
   /*created entity* */
    @PrimaryGeneratedColumn()
    id:number;
    @Column({name:'Product_name',type:'varchar',unique:true,length:10})
    productName:string;
    
    @Column({default:100})
    price:number;
    @Column({default:'1'})
    quanity:number;
    @Column({name:'Productadded_by',nullable:true})
    addedBy:string
    @Column({nullable:false,default:'Description'})
    description:string;
    @CreateDateColumn()
    createdOn:Date;
    @DeleteDateColumn()
    updatedOn:Date;
    @ManyToOne(()=>Category,(category)=>category.product,{eager:true,onDelete:"CASCADE"})
  category:Category

}