import { IsNotEmpty, IsString, Length } from "class-validator";
import { UniqueProductForThisUser } from "../decorators/UniqueProductNameForThisUser.decorator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  @UniqueProductForThisUser()
  public name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  public authorId: string;
  
  @IsString()
  @Length(2, 255)
  public productDocLink: string;
  
  @IsString()
  @Length(2, 255)
  public githubRepoLink: string;

  // @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  public domain: string;
}
