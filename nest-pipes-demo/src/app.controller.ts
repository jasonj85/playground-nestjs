import { Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('contacts')
export class AppController {
  contacts = [
    { id: 1, name: 'jason', email: 'jason@email.com' },
    { id: 2, name: 'tim', email: 'tim@email.com' },
    { id: 3, name: 'cat', email: 'cat@email.com' }
  ];

  @Get()
  getAllContacts(
    @Query('_page', new DefaultValuePipe(1), ParseIntPipe) page, 
    @Query('_limit', new DefaultValuePipe(20), ParseIntPipe) limit) {

      return {
        contacts: this.contacts,
        query: {
          page: {
            value: page,
            type: typeof(page)
          },
          limit: {
            value: limit,
            type: typeof(limit)
          }
        }
      }
  }

  @Get('/:id')
  getContactById(@Param('id', ParseIntPipe) id) {
    let contact1 = this.contacts.find( c => c.id === id);

    if(!contact1) throw new NotFoundException();

    return contact1;
  }
}
