import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateSpeakerDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  company: string;

  @IsString()
  designation: string;

  @IsString()
  bio: string;

  @IsUrl()
  @IsOptional()
  linkedinUrl?: string;

  @IsUrl()
  @IsOptional()
  githubUrl?: string;

  @IsUrl()
  @IsOptional()
  instagramUrl?: string;

  @IsUrl()
  @IsOptional()
  twitterUrl?: string;
} 