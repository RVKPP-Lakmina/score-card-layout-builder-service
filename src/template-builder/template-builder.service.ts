import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from 'src/template/template.schema';

@Injectable()
export class TemplateBuilderService {
    constructor(
        @InjectModel(Template.name) private readonly templateModel: Model<TemplateDocument>,
    ) { }

    async create(templateDto: Partial<Template>): Promise<Template> {
        try {
            const existingTemplate = await this.templateModel.findOne({ name: templateDto.name }).exec();
            if (existingTemplate) {
                throw new BadRequestException('Template with the same name already exists');
            }

            const createdTemplate = new this.templateModel(templateDto);
            return createdTemplate.save();
        } catch (error) {
            throw new BadRequestException('Error creating template: ' + (error as Error).message);
        }
    }

    async findAll(): Promise<Template[]> {
        try {
            return await this.templateModel.find().exec();
        } catch (error) {
            throw new BadRequestException('Error fetching templates: ' + (error as Error).message);
        }
    }

    async findOne(templateName: string): Promise<Template | null> {
        try {
            const template = await this.templateModel.findOne({ name: templateName }).exec();
            if (!template) {
                throw new NotFoundException(`Template with name '${templateName}' not found`);
            }
            return template;
        } catch (error) {
            throw new BadRequestException('Error fetching template: ' + (error as Error).message);
        }
    }

    async update(id: string, updateDto: Partial<Template>): Promise<Template> {
        try {
            const updatedTemplate = await this.templateModel.findByIdAndUpdate(id, updateDto, {
                new: true,
            }).exec();

            if (!updatedTemplate) {
                throw new NotFoundException(`Template with id '${id}' not found`);
            }

            return updatedTemplate;
        } catch (error) {
            throw new BadRequestException('Error updating template: ' + (error as Error).message);
        }
    }

    async delete(id: string): Promise<{ message: string }> {
        try {
            const deleted = await this.templateModel.findByIdAndDelete(id).exec();

            if (!deleted) {
                throw new NotFoundException(`Template with id '${id}' not found`);
            }

            return { message: 'Template deleted successfully' };
        } catch (error) {
            throw new BadRequestException('Error deleting template: ' + (error as Error).message);
        }
    }
}
