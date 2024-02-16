/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateProductDto, DeleteProductDto, Product, ProductDto } from 'src/dtos/ProductDto';

@Controller('api/products')
export class ProductsController {
    products: Product[] = [
        {
            id: 'xx1',
            name: 'Phone1',
            description: 'Super smartphone',
            image: null,
            price: 200,
            isLiked: false
        },
        {
            id: 'xx2',
            name: 'Phone2',
            description: 'Fantastic smartphone',
            image: null,
            price: 200,
            isLiked: true
        },
        {
            id: 'xx3',
            name: 'Phone3',
            description: 'Good smartphone',
            image: null,
            price: 200,
            isLiked: false
        },
        {
            id: 'xx4',
            name: 'Phone4',
            description: 'Fine smartphone',
            image: null,
            price: 200,
            isLiked: false
        }
    ]

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: Array<ProductDto> })
    getAll(): ProductDto[] {
        return this.products;
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, type: CreateProductDto })
    getDetails(@Param('id') id: string): Product {
        const found = this.products.find(product => product.id === id);
        return found;
    }

    @Post('create')
    @ApiResponse({ status: HttpStatus.OK })
    add(@Body() product: CreateProductDto): ProductDto {
        const id = Math.random().toString();
        const prod: Product = {
            id,
            ...product
        }
        this.products.push(prod);
        return prod;
    }

    @Delete('delete/:id')
    @ApiResponse({ status: HttpStatus.OK, type: DeleteProductDto })
    delete(@Param('id') id: string): DeleteProductDto {
        this.products = this.products.filter(product => product.id !== id);
        return {
            message: `Product with a #${id} was removed`,
            id
        };
    }
}
