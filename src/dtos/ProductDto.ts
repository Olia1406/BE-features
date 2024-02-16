import { ApiProperty } from "@nestjs/swagger";
export class Product {
    id: string;
    name: string;
    description: string;
    image: any;
    price: number;
    isLiked: boolean;
}

export class CreateProductDto implements Omit<Product, "id"> {
    @ApiProperty({ description: 'Product name', type: String }) name: string;
    description: string;
    image: any;
    price: number;
    isLiked: boolean;
}


export class ProductDto implements Product {
    id: string;
    @ApiProperty({ description: 'Product name', type: String }) name: string;
    description: string;
    image: any;
    price: number;
    isLiked: boolean;
}

export class DeleteProductDto {
    id: string;
    message: string;
}

