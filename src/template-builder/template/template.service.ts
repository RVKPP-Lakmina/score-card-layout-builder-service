import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './template.schema';

@Injectable()
export class TemplateService {
    constructor(
        @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
    ) { }

    async findOne(templateName: string): Promise<Template | null> {
        const template = await this.templateModel.findOne({ name: templateName }).exec();

        if (!template) {
            throw new BadRequestException(`Template with name ${templateName} not found`);
        }
        return template;
    }

    async findAll(): Promise<Template[]> {
        return this.templateModel.find().exec();
    }

    async create(templateDto: Partial<Template>): Promise<Template> {
        const template = await this.templateModel.findOne({ name: templateDto.name }).exec();

        if (template) {
            throw new Error('Template already exists');
        }

        const createdTemplate = new this.templateModel(templateDto);
        return createdTemplate.save();
    }

    async update(id: string, updateDto: Partial<Template>): Promise<Template> {
        const updatedTemplate = await this.templateModel.findByIdAndUpdate(
            id,
            updateDto,
            { new: true },
        ).exec();

        if (!updatedTemplate) {
            throw new NotFoundException(`Template with ID ${id} not found`);
        }

        return updatedTemplate;
    }

    async delete(id: string): Promise<{ message: string }> {
        const deletedTemplate = await this.templateModel.findByIdAndDelete(id).exec();

        if (!deletedTemplate) {
            throw new NotFoundException(`Template with ID ${id} not found`);
        }

        return { message: 'Template deleted successfully' };
    }
}