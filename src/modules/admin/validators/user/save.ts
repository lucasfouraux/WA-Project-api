import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import { enRoles, IUser, listPublicRoles } from 'modules/database/interfaces/user';

export class UserSaveValidator implements IUser {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  public firstName: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ required: false, type: 'string', maxLength: 50 })
  public lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(150)
  @ApiProperty({ required: true, type: 'string', maxLength: 150 })
  public email: string;

  @IsNotEmpty()
  @IsArray()
  @IsIn(listPublicRoles(), { each: true })
  @ApiProperty({ required: true, enum: listPublicRoles(), isArray: true })
  public roles: enRoles[];
}
