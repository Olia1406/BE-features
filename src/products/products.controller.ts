/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { CreateProductDto, DeleteProductDto, Product, ProductDto } from 'src/dtos/ProductDto';
import { ProductDbService } from 'src/schemas/product.service';

@Controller('api/products')
export class ProductsController {

    constructor(private productDbServ: ProductDbService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: Array<ProductDto> })
    async getAll(@Query() query: any): Promise<ProductDto[]> {
        const product = await this.productDbServ.getList(query)
        return product as any
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, type: CreateProductDto })
    async getDetails(@Param('id') id: string): Promise<any> {
        return await this.productDbServ.getById(id)
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './fe_src/static/images',
            filename: function (req, image, callback) {
                callback(null, image.originalname)
            }
        }),
    }))
    @ApiResponse({ status: HttpStatus.OK })
    async add(@Body() product: CreateProductDto, @UploadedFile() image: Express.Multer.File): Promise<any> {
        const prod: Product = {
            ...product,
            image: `static/images/${image.originalname}`
        }
        return await this.productDbServ.create(prod)
    }

    @Delete('delete/:id')
    @ApiResponse({ status: HttpStatus.OK, type: DeleteProductDto })
    async delete(@Param('id') id: string): Promise<any> {
        return await this.productDbServ.delete(id);
    }
}
