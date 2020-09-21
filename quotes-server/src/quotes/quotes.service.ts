import { Injectable } from '@nestjs/common';
import { Quote } from './interfaces/quote.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class QuotesService {

    constructor(@InjectModel('Quote') private readonly quoteModel: Model<Quote>){}

    quotes: Quote[] = [
        { id: "1", title: "title1", author: "author1" },
        { id: "2", title: "title2", author: "author2" },
        { id: "3", title: "title3", author: "author3" }
    ]

    //get operations
    getQuotes(): Quote[] {
        return this.quoteModel.find().exec();
    }
    
    getQuote(id: string): Quote {
        return this.quotes.find(q => q.id === id);
    }

    //create operations
    createQuote(quote: Quote): Promise<Quote> {
        const newQuote = new this.quoteModel(quote);
        return newQuote.save();
    }

    //update operations
    updateFullQuote(id: string, updatedQuote: Quote) {
        let index = this.quotes.findIndex(q => q.id === id);
        
        if(index > -1) {
            this.quotes[index] = updatedQuote;
        }

        return updatedQuote;
    }

    updatePartialQuote(id: string, updatedQuote: Quote) {
        let index = this.quotes.findIndex(q => q.id === id);
        
        if(index > -1) {
            this.quotes[index] = {...this.quotes[index], ...updatedQuote};
        }

        return updatedQuote;
    }

    //delete operations
    deleteQuote(id: string) {
        return this.quotes.find(q => q.id === id);
    }
}
