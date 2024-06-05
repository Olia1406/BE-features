import { ApiProperty } from "@nestjs/swagger";
export class Order {
    id?: string;
    userId: string;
    name: string; 
    wayToPayId: string; 
    address: string;
    productsList: {_id: string, qty: number}[];
    isDelivered: boolean;
}

export class CreateOrderDto implements Omit<Order, "id"> {
    @ApiProperty({ description: 'Name', type: String }) name: string; 
    userId: string;
    wayToPayId: string; 
    address: string;
    productsList: {_id: string, qty: number}[];
    isDelivered: boolean;
}


export class OrderDto implements Order {
    id: string;    
    userId: string;
    @ApiProperty({ description: 'Name', type: String }) name: string; 
    wayToPayId: string; 
    address: string;
    productsList: {_id: string, qty: number}[];
    isDelivered: boolean;
}

export class DeleteOrderDto {
    id: string;
    message: string;
}

