import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { Transaction, Page } from 'objection';

@Injectable()
export class OrderRepository {
  public async insert(model: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).insert(model);
  }

  public async update(model: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).updateAndFetchById(model.id, <Order>model);
  }

  public async findById(id: number, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).where({ id }).first();
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await Order.query(transaction).del().where({ id });
  }

  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Order>> {
    let query = Order.query(transaction)
      .select("*")
      .page(params.page, params.pageSize);

    if(params.orderBy) {
      query = query.orderBy(params.orderBy, params.orderDirection);
    }

    if(params.term) {
      query = query.where(query => {
        return query
          .where('description', 'ilike', `%${params.term}%`)
      })
    }

    return query;
  }
}
