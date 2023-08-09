import { CacheModule, HttpServer, Inject, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { CategoryRepository } from "./categories.repository";
import { CategoriesController } from "./Categories.Controller";
import { CatagoriesService } from './catagories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from "./category.entity";
import { HttpModule, HttpService } from "@nestjs/axios";
import { Product } from "../products/product.entity";
import { LoggerMiddleware } from "../common/middleware/logger-middleware.middleware";
import { ProductRepository } from "../products/product.repository";
/**
 * category module
 */
@Module({

  controllers: [CategoriesController],
  //providers:[CatagoriesService],/***standard*
  providers: [{
    provide: CatagoriesService,
    useClass: CatagoriesService/***class based provider*/

  }, {
    provide: 'GREET',
    useValue: 'hello how are you'/***useValue based provider*/
  },
  {
    provide: 'NUMBERLIST',
    useFactory: () => {
      let arr = []/***useFactory based provider*/
      for (let i = 1; i <= 10; i++) {
        arr.push(i)
      }
      return arr;
    }
  },

    /*{
    
        provide: 'USER_LIST',
    
        useFactory: async (http: HttpService) => {
    
            let res = await http.get('http://localhost:3000/Posts').toPromise();
    
            console.log(res)
    
            return res.data;
    
        },
    
        inject: [HttpService]
    
    }*/
    CategoryRepository,
    ProductRepository
  ],
  imports: [HttpModule, TypeOrmModule.forFeature([Category,Product]), CacheModule.register({
    ttl: 30
  })],
  exports: []

})
export class categoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {

    consumer.apply(LoggerMiddleware).forRoutes(CategoriesController);

    // {path: '/categories', method: RequestMethod.GET},

    // {path: '/categories/all/products', method: RequestMethod.GET},

    //{path: '/categories/:id', method: RequestMethod.DELETE}

    // )

  }
}
//MailModule removed
/**for exculde */
/*configure(consumer: MiddlewareConsumer) {

  consumer.apply(LoggerMiddleware)

  .exclude(

      {path: '/categories/all/products', method: RequestMethod.GET}

  )

  .forRoutes(CategoriesController)

}*/