import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class Contact {
    @IsNotEmpty()
    @IsString()
    @Length(2,30)
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}
