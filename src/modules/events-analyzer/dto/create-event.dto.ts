import { IsNotEmpty, IsString, Length } from "class-validator";
import { AbstractDto } from "src/shared/dto/abstract.dto";

export class CreateEventDto extends AbstractDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  public eventName: string;
  // @EventsExist()

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  public eventDescription: string;
  
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  public eventLocation: string;
  
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  public eventVenue: string;
}