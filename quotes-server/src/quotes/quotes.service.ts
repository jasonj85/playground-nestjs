import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Quote } from './interfaces/quote.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class QuotesService {

    constructor(@InjectModel('Quote') private readonly quoteModel: Model<Quote>) { }

     //get operations
    async getQuotes(): Promise<Quote[]> {
        return await this.quoteModel.find().exec();
    }

    async getLatestQuote(): Promise<Quote> {
        return await this.quoteModel.findOne().sort({ field: 'asc', _id: -1 }).exec();
    }

    async getQuote(id: string): Promise<Quote> {
        try {
            return await this.quoteModel.findById(id).exec();
        } catch (error) {
            throw new HttpException('Quote not found', HttpStatus.NOT_FOUND);
        }
    }

    //create operations
    async createQuote(quote: Quote): Promise<Quote> {
        const newQuote = await new this.quoteModel(quote);
        return newQuote.save();
    }

    //update operations
    async updateFullQuote(id: string, updatedQuote: Quote): Promise<Quote> {
        return await this.quoteModel.findByIdAndUpdate(id, updatedQuote, { new: true });
    }

    async updatePartialQuote(id: string, props: Quote): Promise<Quote> {
        return await this.quoteModel.findByIdAndUpdate(id, { $set: props }, { upsert: true, new: true});
    }

    //delete operations
    async deleteQuote(id: string): Promise<any> {
        return await this.quoteModel.findByIdAndRemove(id);
    }
}
