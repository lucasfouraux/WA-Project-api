import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { enRoles } from 'modules/database/interfaces/user';
import { Order } from 'modules/database/models/order';
import { OrderService } from '../services/order';
import { OrderListValidator } from '../validators/order/list';
import { OrderSaveValidator } from '../validators/order/save';

@ApiTags('Admin: Order')
@Controller('order')
// @AuthRequired([enRoles.admin])
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async save(@Body() model: OrderSaveValidator) {
    return this.orderService.save(model)
  }

  @Get()
  @ApiResponse({ status: 200, type: [Order]})
  public async list(@Query() model: OrderListValidator) {
    return this.orderService.list(model)
  }

  @Get(':orderId')
  @ApiResponse({ status: 200, type: Order })
  public async details(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.details(orderId);
  }

  @Delete(':orderId')
  public async delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.remove(orderId);
  }


}
