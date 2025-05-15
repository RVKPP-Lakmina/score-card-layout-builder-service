import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './create-product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async create(dto: CreateProductDto): Promise<Product> {
        const created = new this.productModel(dto);
        return created.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findById(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).exec();
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    async update(id: string, updateData: Partial<CreateProductDto>): Promise<Product> {
        const updated = await this.productModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!updated) throw new NotFoundException('Product not found');
        return updated;
    }

    async delete(id: string): Promise<{ message: string }> {
        const result = await this.productModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('Product not found');
        return { message: 'Product deleted successfully' };
    }
}
