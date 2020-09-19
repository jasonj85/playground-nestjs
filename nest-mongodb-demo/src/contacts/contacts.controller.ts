import { BadRequestException, Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Contact } from './contact.schema';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
    constructor(private service: ContactsService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async createContact(@Body() body: Contact) {
        try {
            return await this.service.addContact(body);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    @Get()
    async getAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number) {
        try {
           return await this.service.getContacts(page, limit);            
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    @Get('/:id')
    async getContact(@Param('id') id: string) {
        try {
            return await this.service.getContact(id);     
        } catch (e) {
            throw new BadRequestException(e);
        }
    }
    
    @Put('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateFullContact(@Param('id') id: string, @Body() body: Contact) {
        try {
            await this.service.updateFullContact(id, body);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    @Patch('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UsePipes(new ValidationPipe({ transform: true }))
    async updatePartialContact(@Param('id') id: string, @Body() props) {
        try {
            await this.service.updatePartialContact(id, props);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteContact(@Param('id') id: string) {
        try {
            let res = await this.service.deleteContact(id);
            if (res.deletedCount === 0) throw new NotFoundException();
        } catch (e) {
            throw new BadRequestException(e);
        }
    }
}
