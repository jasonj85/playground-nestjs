import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { QuoteSchema } from './schemas/quote.schema';

@Module({
    controllers: [QuotesController],
    providers: [QuotesService],
    imports: [MongooseModule.forFeature(
        [
            { 'name': 'Quote', schema: QuoteSchema }
        ]
    )]
})
export class QuotesModule { }
