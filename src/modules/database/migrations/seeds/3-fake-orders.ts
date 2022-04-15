import * as faker from 'faker/locale/pt_BR';
import * as Knex from 'knex';
import { IOrder } from 'modules/database/interfaces/order';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  const orders = await knex
    .count()
    .from('Order')
    .first();

  if (Number(orders.count) !== 0) return;

  for (let x = 0; x < 100; x++) {

    const order: IOrder = {
      description: faker.random.words(),
      amount: Math.round(Math.random() * 1000 + 1) ,
      value: Math.random() * 10000 + 1,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(order).into('Order');
  }
}
