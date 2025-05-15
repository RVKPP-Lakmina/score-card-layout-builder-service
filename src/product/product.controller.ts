import { Controller, Get, Post, Put, Delete, Query, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './create-product.dto';
import { Product } from './product.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    create(@Body() dto: CreateProductDto): Promise<Product> {
        return this.productService.create(dto);
    }

    @Get()
    async findAllOrById(@Query('id') id?: string): Promise<Product | Product[]> {
        if (id) {
            return this.productService.findById(id);
        }
        return this.productService.findAll();
    }

    @Put()
    update(@Query('id') id: string, @Body() body: Partial<CreateProductDto>): Promise<Product> {
        return this.productService.update(id, body);
    }

    @Delete()
    delete(@Query('id') id: string): Promise<{ message: string }> {
        return this.productService.delete(id);
    }
}
