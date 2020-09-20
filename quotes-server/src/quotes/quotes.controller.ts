import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from './interfaces/quote.interface';
import { QuotesService } from './quotes.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@ApiTags('quotes')
@Controller('quotes')
export class QuotesController {
    constructor(private quotesService: QuotesService) { }

    @Get()
    getQuotes(): Quote[] {
        return this.quotesService.getQuotes();
    }

    @ApiParam({ name: 'id' })
    @Get(':id')
    getQuote(@Param('id') id: string): Quote {
        return this.quotesService.getQuote(id);
    }

    @Post()
    createQuote(@Body() quote: CreateQuoteDto): Quote {
        return this.quotesService.createQuote(quote);
    }

    @ApiParam({ name: 'id' })
    @Put(':id')
    updateFullQuote(@Param('id') id: string, @Body() quote: CreateQuoteDto): Quote {
        return this.quotesService.updateFullQuote(id, quote);
    }

    @ApiParam({ name: 'id' })
    @Patch(':id')
    updatePartialQuote(@Param('id') id: string, @Body() quote: CreateQuoteDto): Quote {
        return this.quotesService.updatePartialQuote(id, quote);
    }

    @ApiParam({ name: 'id' })
    @Delete(':id')
    deleteQuote(@Param('id') id:string): Quote {
        return this.quotesService.deleteQuote(id);
    }

}
