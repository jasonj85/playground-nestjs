import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from './interfaces/quote.interface';
import { QuotesService } from './quotes.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('quotes')
@Controller('quotes')
export class QuotesController {
    constructor(private quotesService: QuotesService) { }

    @Get()
    getQuotes(): Promise<Quote[]> {
        return this.quotesService.getQuotes();
    }

    @Get('latest')
    getLatest(): Promise<Quote> {
        return this.quotesService.getLatestQuote();
    }

    @ApiParam({ name: 'id' })
    @Get(':id')
    getQuote(@Param('id') id: string): Promise<Quote> {
        return this.quotesService.getQuote(id);
    }

    @Post()
    async createQuote(@Body() quote: CreateQuoteDto): Promise<Quote> {
        try {
            return await this.quotesService.createQuote(quote);       
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @ApiParam({ name: 'id' })
    @Put(':id')
    updateFullQuote(@Param('id') id: string, @Body() quote: CreateQuoteDto): Promise<Quote> {
        return this.quotesService.updateFullQuote(id, quote);
    }

    @ApiParam({ name: 'id' })
    @Patch(':id')
    updatePartialQuote(@Param('id') id: string, @Body() quote: CreateQuoteDto): Promise<Quote> {
        return this.quotesService.updatePartialQuote(id, quote);
    }

    @ApiParam({ name: 'id' })
    @Delete(':id')
    deleteQuote(@Param('id') id:string): Promise<any> {
        return this.quotesService.deleteQuote(id);
    }

}
