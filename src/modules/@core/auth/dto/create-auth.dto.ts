import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty()
    @IsEmail()
    @Length(3, 255)
    email: string;

    @IsNotEmpty()
    @Length(3, 255)
    password: string;
}
