import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { AbstractDto } from "src/shared/dto/abstract.dto";
import { UniqueEmail } from "../decorators/UniqueEmail.decorator";

export class CreateUserDto extends AbstractDto {
  @IsString()
  @Length(3, 255)
  public id?: string;

  @IsString()
  @Length(3, 255)
  public userId?: string;
  
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  @IsEmail()
  @UniqueEmail()
  public userEmail: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  public username?: string;

  // @IsString()
  // @Length(3, 255)
  // public password?: string;

  @IsString()
  @Length(3, 255)
  public product?: string;
}