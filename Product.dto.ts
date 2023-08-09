import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';
import { Min, Max } from 'class-validator';
import { Category } from 'src/catagories/category.entity';
/**product object creted */
export class ProductDTO {
    /**Api object creted */
    @ApiProperty()
    id: number;
    /**Api property creted */
    @ApiProperty({
        description: "Product name description",
        required: true
    })
    /**string object creted */
    //@IsString({
    //   message:"Products must be string"
    //})
    /**length object creted */
    // @Length(2,20,{message:'Products should be beetween 2 t 20'})
    productName: string
    /**string object created */
    @ApiProperty()
    //@IsString()
    addedBy: string
    /**for description */
    @ApiProperty()
    //@IsString()
    description: string
    /**price number should be integer */
    @ApiProperty()
    //@Min(100)
    //@Max(1999)
    //@IsInt()
    price: number;
    /**quantity should be integer */
    @ApiProperty()
    //@IsInt()
    quanity: number;
    @ApiProperty()
    category: Category;


}