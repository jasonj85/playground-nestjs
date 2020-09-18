import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Contact } from './contact.schema';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
    constructor(private service: ContactsService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    createContact(@Body() body: Contact) {
        return this.service.addContact(body);
    }

    @Get()
    getAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number) {
        return this.service.getContacts(page, limit);
    }


}
