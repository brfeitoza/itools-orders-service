import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { OrderDto } from './dto/OrderDto';
import KafkaConfig from 'src/config/kafka';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAll(): Promise<OrderDto[]> {
    return this.ordersService.getAll();
  }

  @ApiQuery({ name: 'id' })
  @Get(':id')
  async getById(@Query('id') id: string): Promise<OrderDto> {
    return this.ordersService.getById(id);
  }

  @ApiBody({ type: OrderDto })
  @Post()
  async create(@Body() order: OrderDto): Promise<OrderDto> {
    const newOrder = await this.ordersService.create(order);

    const kafka = new KafkaConfig();

    kafka.produce('orders', [
      {
        key: 'order',
        value: JSON.stringify(newOrder),
      },
    ]);

    return newOrder;
  }

  @ApiQuery({ name: 'id' })
  @ApiBody({ type: OrderDto })
  @Put(':id')
  async update(
    @Query('id') id: string,
    @Body() order: OrderDto,
  ): Promise<OrderDto> {
    return this.ordersService.update(id, order);
  }

  @ApiQuery({ name: 'id' })
  @Delete(':id')
  async delete(@Query('id') id: string): Promise<OrderDto> {
    return this.ordersService.delete(id);
  }
}
