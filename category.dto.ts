import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString,Length } from 'class-validator';
import { Product } from "../../products/product.entity";
/**entity created */
export class CategoryDTO{
    /**apiproperty used */
  @ApiProperty()
    id: number;
    /**apiproperty used */
    @ApiProperty({
     
        description:"category name description",
        required:true
    })
     /**isstring used */
    @IsString({
        message:"category should be string number not acceptable"
    })
     /**length used */
    @Length(2,20,{message:'category should be beetween 2 t 20'})
    categoryName:string
      /**added by used */
      @ApiProperty()
      @IsNotEmpty({message:'added by should not empty'})
    @IsString()
    addedBy:string
   
    @ApiProperty()
     product:Product[]
}