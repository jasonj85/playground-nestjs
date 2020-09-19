import { Injectable } from '@nestjs/common';
import { Contact } from './contact.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ContactsService {
    constructor(@InjectModel('Contact') private ContactModel: Model<Contact>) { }

    addContact(contact: Contact) {

        let c = new this.ContactModel({ ...contact });
        return c.save();
    }

    getContacts(page: number, limit: number) {
        return this.ContactModel.find().limit(limit).skip((page - 1) * limit);
    }

    getContact(id: string) {
        return this.ContactModel.findById(id);
    }

    updateFullContact(id: string, contact: Contact) {
        return this.ContactModel.updateOne({ _id: id }, contact);
    }

    updatePartialContact(id: string, props: any) {
        return this.ContactModel.updateOne({ _id: id }, { $set: props });
    }

    deleteContact(id: string) {
        return this.ContactModel.deleteOne({ _id: id });
    }

}
