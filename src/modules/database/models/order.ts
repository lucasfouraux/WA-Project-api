import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';
import { IOrder } from '../interfaces/order';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'string' })
  public description: string;
  @ApiProperty({ type: 'integer' })
  public amount: number;
  @ApiProperty({ type: 'integer' })
  public value: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  createdDate?: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedDate?: Date;

  public static get tableName(): string {
    return 'Order';
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  public $formatJson(data: IOrder): IOrder {
    return data;
  }
}
