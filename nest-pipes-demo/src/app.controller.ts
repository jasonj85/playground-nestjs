import { Body, Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { MandatoryFieldsPipe } from './mandatory-fields.pipe';
import { UppercasePipe } from './uppercase.pipe';

@Controller('contacts')
export class AppController {
  contacts = [
    { id: 1, name: 'jason', email: 'jason@email.com' },
    { id: 2, name: 'tim', email: 'tim@email.com' },
    { id: 3, name: 'cat', email: 'cat@email.com' }
  ];

  @Post()
  createContact(
    @Body(new MandatoryFieldsPipe(['name', 'email', 'phone'])) body) {
    return body;
  }

  @Get()
  getAllContacts(
    @Query('_page', new DefaultValuePipe(1), ParseIntPipe) page,
    @Query('_limit', new DefaultValuePipe(20), ParseIntPipe) limit) {

    return {
      contacts: this.contacts,
      query: {
        page: {
          value: page,
          type: typeof (page)
        },
        limit: {
          value: limit,
          type: typeof (limit)
        }
      }
    }
  }

  @Get('/:id')
  getContactById(@Param('id', ParseIntPipe) id) {
    let contact1 = this.contacts.find(c => c.id === id);

    if (!contact1) throw new NotFoundException();

    return contact1;
  }

  @Get('/q')
  @UsePipes(UppercasePipe)
  query(@Query('city') city, @Query('county') county, @Query('country') country) {

    return { city, county, country }
  }
}
