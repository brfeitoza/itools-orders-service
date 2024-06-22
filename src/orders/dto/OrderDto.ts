import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  products: string[];

  @ApiProperty()
  status: string;

  @ApiProperty()
  expectedDelivery: Date | undefined;

  @ApiProperty()
  deliveryAddress: string | undefined;

  @ApiProperty()
  expectedReturn: Date | undefined;

  @ApiProperty()
  returnAddress: string | undefined;
}
