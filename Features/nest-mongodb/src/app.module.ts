import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    MongooseModule.forRoot('xxx', { useCreateIndex: true }),
    ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
