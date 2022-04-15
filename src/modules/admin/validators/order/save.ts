import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/order'

export class OrderSaveValidator implements IOrder {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer'})
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(250)
  @ApiProperty({ required: false, type: 'string', minLength: 5, maxLength: 250})
  public description: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer'})
  public amount: number;

  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty({ required: false, type: 'number' })
  public value: number;

  public createdDate?: Date;
  public updatedDate?: Date;
}