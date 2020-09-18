import { Injectable } from '@nestjs/common';
import { Contact } from './contact.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ContactsService {

    constructor(@InjectModel('Contact') private ContactModel: Model<Contact>) { }

    addContact(contact: Contact) {

        let c = new this.ContactModel({ ...contact });
        return c.save()
            .then(result => {
                return result;
            })
            .catch(err => {
                return err;
            });
    }

    getContacts(page: number, limit: number) {
       return this.ContactModel.find().limit(limit).skip((page-1)*limit)
            .then(result => {
                return result;
            })
            .catch(err => {
                return err;
            });
    }

}
