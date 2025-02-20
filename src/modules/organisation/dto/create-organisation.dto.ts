import { IsNotEmpty, IsString, Length } from "class-validator";
import { UniqueOrganisationName } from "../decorators/UniqueOrganisationName.decorator";

export class CreateOrganisationDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  @UniqueOrganisationName()
  public organisationName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  public authorId: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  public domain: string;
}
