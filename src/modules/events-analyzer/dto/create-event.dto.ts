import { IsString, IsNumber, IsDate, IsArray, IsOptional, ValidateNested, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSpeakerDto } from './create-speaker.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'Tech Conf 2020', description: 'This is meant to be the unique event name'})
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @ApiProperty({ example: 'The event to disucss the upcoming tech in 2020'})
  @IsString()
  @IsNotEmpty()
  eventAgenda: string;

  @ApiProperty({ example: 'This is descible the event'})
  @IsString()
  @IsNotEmpty()
  eventDescription: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  eventStartDateTime: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  eventEndDateTime: Date;

  @ApiProperty({ example: 'Hyderabad'})
  @IsString()
  @IsNotEmpty()
  eventLocation: string;

  @ApiProperty({ example: 'City Hall'})
  @IsString()
  @IsNotEmpty()
  eventVenue: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  @Min(1)
  eventVenueCapacity: number;

  @ApiProperty({ example: []})
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSpeakerDto)
  speakers?: CreateSpeakerDto[];
}