import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Contact } from './contact';

@Controller('contacts')
export class AppController {

  @Post()
  @UsePipes(ValidationPipe)
  createContact(@Body() contact: Contact) {
    

    return contact;
  }
}
