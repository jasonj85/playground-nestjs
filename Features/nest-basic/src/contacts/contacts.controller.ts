import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('contacts')
export class ContactsController {
    contacts = [
        {
            id: 1, name: 'Jason', email: 'jason@email.com'
        },
        {
            id: 2, name: 'Tim', email: 'Tim@email.com'
        },
        {
            id: 3, name: 'Bob', email: 'Bob@email.com'
        },
        {
            id: 4, name: 'June', email: 'June@email.com'
        },
    ];

    @Get()
    getAll() {
        return [...this.contacts];
    }

    @Get('/:contactId')
    getOne(@Param('contactId') id: number) {
        let contact = this.contacts.find(c => c.id == id);

        if(!contact) {
            throw new NotFoundException();
        }

        return {...contact};
    }

    @Post()
    createContacts(@Body() body) {
        let ids = this.contacts.map(c => c.id);
        let newId = Math.max(...ids) + 1;
        let out = null;

        if (body instanceof Array) {
            let newContacts = body;
            newContacts.forEach((c, i) => c.id = newId + 1);

            this.contacts.push(...newContacts)
            out = newContacts;
        } else {
            let newContact = body
            newContact.id = newId;

            this.contacts.push(newContact);
            out = newContact;
        }

        return out;
    }

    @Put('/:id')
    updateContact(@Param('id') id, @Body() updatedContact) {    
        let index = this.contacts.findIndex(c => c.id == id);
        
        if(index === -1) {
            throw new NotFoundException();
        }

        updatedContact.id = parseInt(id);
        this.contacts[index] = updatedContact;

        return updatedContact;
    }

    @Patch('/:id')
    partialUpdateContact(@Param('id') id, @Body() updatedContact){
        let index = this.contacts.findIndex(c => c.id == id);
        
        if(index === -1) {
            throw new NotFoundException();
        }

        this.contacts[index] = {...this.contacts[index], ...updatedContact}

        return {...this.contacts[index]};
    }

    @Delete('/:id')
    deleteContact(@Param('id') id) {
        let index = this.contacts.findIndex(c => c.id == id);
        
        if(index === -1) {
            throw new NotFoundException();
        }

        let deleted = this.contacts.splice(index, 1);
        
        return deleted[0];
    }
}
