import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './template.schema';
import { Helpers } from 'src/utility/helpers.utility';
import { LoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class TemplateService extends Helpers {
    constructor(
        @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
        private readonly loggerService: LoggerService,
    ) { super() }

    async findOne(templateId: string): Promise<{ data: Template; status: number; message: string }> {
        const template = await this.templateModel.findOne({ _id: templateId }).exec();

        if (!template) {
            throw new BadRequestException(`Template with templateId ${templateId} not found`);
        }
        return {
            data: template,
            status: 1,
            message: `Template fetched successfully`,
        };
    }

    async findAll(): Promise<{ data: { [key: string]: Template }; status: number; message: string }> {
        const templates = await this.templateModel.find().exec();
        const result: { [key: string]: Template } = {};

        templates.forEach(template => {
            result[template._id.toString()] = template;
        });

        return { data: result, status: 1, message: 'Templates fetched successfully' };
    }

    async create(templateDto: Partial<Template>): Promise<{ data: Template; status: number; message: string }> {
        if (!templateDto.name) {
            this.loggerService.error(
                'Template name is required',
                'create',
                'Template.service.ts',
            );
            throw new BadRequestException('Template name is required');
        }

        const existingTemplate = await this.templateModel.findOne({ name: templateDto.name }).exec();

        if (existingTemplate) {
            throw new Error('Template already exists');
        }

        const templateKey = this.keyGenarate(templateDto.name);

        const createdTemplate = new this.templateModel({
            ...templateDto,
            _id: templateKey,
        });

        const savedTemplate = await createdTemplate.save();

        return {
            data: savedTemplate,
            status: 1,
            message: 'Template created successfully',
        };
    }


    async update(id: string, updateDto: Partial<Template>): Promise<Template> {
        const updatedTemplate = await this.templateModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();

        if (!updatedTemplate) {
            throw new NotFoundException(`Template with ID ${id} not found`);
        }

        return updatedTemplate;
    }

    async delete(id: string): Promise<{ status: number; message: string }> {
        const deletedTemplate = await this.templateModel.findByIdAndDelete(id).exec();

        if (!deletedTemplate) {
            throw new NotFoundException(`Template with ID ${id} not found`);
        }

        return { status: 1, message: 'Template deleted successfully' };
    }
}
