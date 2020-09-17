import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

const filename = './contacts.json';

@Injectable()
export class ContactsService {

    contacts = [];

    constructor() {

        try {
            let content = fs.readFileSync(filename, 'utf-8');

            this.contacts = JSON.parse(content);
        } catch (error) {
            this.contacts = [];
        }

    }

    exists(id) {
        return this.contacts.findIndex(c => c.id == id) != -1;
    }

    writeToFile() {
        fs.writeFileSync(filename, JSON.stringify(this.contacts), 'utf-8');
    }

    // get methods
    get nextId() {
        if(this.contacts.length === 0) return 1;
        let ids = this.contacts.map(c => c.id);
        return Math.max(...ids) + 1;
    }

    getContacts() {
        return [...this.contacts];
    }

    getContact(id) {
        return this.contacts.find(c => c.id == id);
    }

    // add methods
    addContact(newContact) {
        newContact.id = this.nextId;
        this.contacts.push(newContact);
        this.writeToFile();
        return newContact;
    }

    addContacts(newContacts) {
        let nextId = this.nextId;
        newContacts.forEach((c, i) => c.id = nextId + i);
        this.contacts.push(...newContacts);
        this.writeToFile();
        return newContacts;
    }

    // update methods
    updateFullContact(id, contact) {
        id = parseInt(id);
        let index = this.contacts.findIndex(c => c.id == id);

        if (index != -1 ) {
            this.contacts[index] = {id, ...contact};
            this.writeToFile();
            return {...this.contacts[index]};
        }
    }

    updatePartialContact(id, contact) {
        id = parseInt(id);
        let index = this.contacts.findIndex(c => c.id == id);

        if (index != -1 ) {
            this.contacts[index] = {...this.contacts[index], ...contact};
            this.writeToFile();
            return {...this.contacts[index]};
        }
    }

    // delete methods
    deleteContact(id) {
        let index = this.contacts.findIndex(c => c.id == id);

        if (index != -1 ) {
            let contact = this.contacts.splice(index, 1)[0];
            this.writeToFile();
            return contact;
        }

    }

}
