import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsController } from './contacts/contacts.controller';
import { ContactsModule } from './contacts/contacts.module';
import { enableCors } from './cors.middleware';
import { loggerMiddleware } from './logger.middleware';

import * as helmet from 'helmet';

@Module({
  imports: [ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet(), loggerMiddleware, enableCors)
      .forRoutes(ContactsController);
  }

}
