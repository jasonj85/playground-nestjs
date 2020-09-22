import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuotesModule } from './quotes/quotes.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI, {'useFindAndModify': false}), QuotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('quotes');
  }
}
