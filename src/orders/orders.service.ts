import { Injectable } from '@nestjs/common';
import { prisma } from 'src/config/prisma';
import { OrderDto } from './dto/OrderDto';

@Injectable()
export class OrdersService {
  async getAll(): Promise<OrderDto[]> {
    return prisma.order.findMany();
  }

  async getById(id: string): Promise<OrderDto> {
    return prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  async create(order: OrderDto): Promise<OrderDto> {
    return prisma.order.create({
      data: order,
    });
  }

  async update(id: string, order: OrderDto): Promise<OrderDto> {
    return prisma.order.update({
      where: {
        id,
      },
      data: order,
    });
  }

  async delete(id: string): Promise<OrderDto> {
    return prisma.order.delete({
      where: {
        id,
      },
    });
  }
}
