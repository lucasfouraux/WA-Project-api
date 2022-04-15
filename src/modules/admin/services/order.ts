import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { Page } from 'objection';
import { OrderRepository } from '../repositories/order';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
  ) {}

  public async save(model: IOrder): Promise<Order> {
    if (model.id) {
      const order = await this.orderRepository.findById(model.id)
      if (!order) throw new NotFoundException('not-found');
      return this.orderRepository.update(model);
    }
    return this.orderRepository.insert(model);
  }

  public async remove(orderId: number): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    if(!order) throw new NotFoundException('not-found');
    return await this.orderRepository.remove(orderId);
  }

  public async list(model: IPaginationParams): Promise<Page<Order>> {
    return this.orderRepository.list(model);
  }

  public async details(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if(!order) throw new NotFoundException('not-found');
    return this.orderRepository.findById(orderId);
  }
}
