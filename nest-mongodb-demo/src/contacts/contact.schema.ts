import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';
import {} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Contact {
    @Prop()
    @IsNotEmpty()
    @Length(2, 30)
    name: string;

    @Prop({unique: true})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Prop()
    @IsPhoneNumber('ZZ')
    phone: string;
    
    @Prop()
    city: string;
    @Prop()
    county: string;
    @Prop()
    country: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);