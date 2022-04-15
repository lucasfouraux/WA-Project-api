import { NotFoundException } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';
import { OrderRepository } from '../repositories/order';

import { OrderService } from './order';

/* eslint-disable max-len */
describe('Admin/OrderService', () => {
  let orderRepository: OrderRepository
  let service: OrderService

  const order: IOrder = {
    description: 'Order',
    amount: 5,
    value: 5.74
  };

  const updatedOrder: IOrder = {
    id: 1,
    description: 'Order',
    amount: 5,
    value: 5.74
  };

  beforeEach(async () => {
    orderRepository = new OrderRepository()
    service = new OrderService(orderRepository)
  });

  it('should orderRepository.insert with correct values', async () => {
    jest.spyOn(orderRepository, 'insert').mockImplementationOnce(order => Promise.resolve({ ...order } as any));
    const result = await service.save(order);

    expect(orderRepository.insert).toHaveBeenCalledWith(order)
    expect(result).not.toBeFalsy();
    expect(result).toEqual(order);
  });

  it('should update a user', async () => {
    jest.spyOn(orderRepository, 'update').mockImplementationOnce(updatedOrder => Promise.resolve({ ...updatedOrder } as any));
    jest.spyOn(orderRepository, 'findById').mockImplementationOnce(order => Promise.resolve({order} as any));

    const result = await service.save({ id: 1, ...updatedOrder });

    expect(orderRepository.update).toHaveBeenCalledWith({id: 1,  ...updatedOrder})
    expect(result).toEqual({ id: 1, ...updatedOrder });
  });

  it('should throw NotFoundException when try to update a not found order', async () => {
    jest.spyOn(orderRepository, 'findById').mockResolvedValueOnce(null);

    try {
      await service.save(updatedOrder)
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('should remove a order', async () => {
    jest.spyOn(orderRepository, 'findById').mockImplementationOnce(order => Promise.resolve({order} as any));
    jest.spyOn(orderRepository, 'remove').mockResolvedValueOnce();

    await service.remove(1);
  });

  it('should throw NotFoundException when try to remove a not found order', async () => {
    jest.spyOn(orderRepository, 'findById').mockResolvedValueOnce(null);

    try {
      await service.remove(2);
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

});
