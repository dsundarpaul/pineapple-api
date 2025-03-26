import { IsString, IsNumber, IsDate, IsArray, IsOptional, ValidateNested, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSpeakerDto } from './create-speaker.dto';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsString()
  @IsNotEmpty()
  eventAgenda: string;

  @IsString()
  @IsNotEmpty()
  eventDescription: string;

  @IsDate()
  @Type(() => Date)
  eventStartDateTime: Date;

  @IsDate()
  @Type(() => Date)
  eventEndDateTime: Date;

  @IsString()
  @IsNotEmpty()
  eventLocation: string;

  @IsString()
  @IsNotEmpty()
  eventVenue: string;

  @IsNumber()
  @Min(1)
  eventVenueCapacity: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSpeakerDto)
  speakers?: CreateSpeakerDto[];
}