import { ApiHideProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

@Exclude()
export class AbstractDto {
  id?: string;

  @ApiHideProperty()
  isActive?: boolean;

  @ApiHideProperty()
  isArchived?: boolean;

  @IsOptional()
  @IsString()
  @ApiHideProperty()
  createdBy?: string;

  @IsOptional()
  @IsString()
  @ApiHideProperty()
  updatedBy?: string;

  @IsOptional()
  @IsString()
  @ApiHideProperty()
  product?: string;
}