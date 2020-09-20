import {ApiProperty} from '@nestjs/swagger';

export class UpdateQuoteDto {
    @ApiProperty()
    readonly title?: string;
    
    @ApiProperty()
    readonly author?: string;
}