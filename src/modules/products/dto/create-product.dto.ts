import { IsNotEmpty, IsString, Length } from "class-validator";
import { UniqueProductForThisUser } from "../decorators/UniqueProductNameForThisUser.decorator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ example: 'Supabase', description: 'Unique product name' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  @UniqueProductForThisUser()
  public name: string;

  @ApiProperty({ example: 'User id', description: 'the user id that is creating this product' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  public authorId: string;
  
  @ApiProperty({ example: 'https://www.someting.com', description: 'The product doc link to generate analytics' })
  @IsString()
  @Length(2, 255)
  public productDocLink: string;
  
  @ApiProperty({ example: 'https://www.someting.com', description: 'The product public main github repo link to generate analytics' })
  @IsString()
  @Length(2, 255)
  public githubRepoLink: string;

  // @IsNotEmpty()
  @ApiProperty({ example: '.com', description: 'ignre need to remove this' })
  @IsString()
  @Length(2, 255)
  public domain: string;
}
