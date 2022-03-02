import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
    constructor(private service: ContactsService) {}

    @Post()
    addContacts(@Body() body) {
        if (body instanceof Array) {
            return this.service.addContacts(body);
        }
        else {
            return this.service.addContact(body);
        }
    }

    @Get()
    getAllContacts() {
        return this.service.getContacts();
    }

    @Get('/:id')
    getContactById(@Param('id') id) {
        if(this.service.exists(id)) {
            return this.service.getContact(id);
        }

        throw new NotFoundException();
    }

    @Put('/:id')
    updateFullContactById(@Param('id') id, @Body() body) {
        if(this.service.exists(id)) {
           return this.service.updateFullContact(id, body);
        }

        throw new NotFoundException();
    }

    @Patch('/:id')
    updatePartialContactById(@Param('id') id, @Body() body) {
        if(this.service.exists(id)) {
           return this.service.updatePartialContact(id, body);
        }
        
        throw new NotFoundException();
    }

    @Delete('/:id')
    deleteContactById(@Param('id') id) {
        if(this.service.exists(id)) {
           return this.service.deleteContact(id);
        }
        
        throw new NotFoundException();
    }

}
