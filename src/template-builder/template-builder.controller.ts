import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Template } from 'src/template-builder/template/template.schema';
import { TemplateService } from './template/template.service';
import { CreateTemplateDto } from './dto/create-template-dto';

@Controller('template-builder')
export class TemplateBuilderController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async create(
    @Body() createTemplateDto: CreateTemplateDto,
  ): Promise<{ data: Template; status: number; message: string }> {
    return this.templateService.create(createTemplateDto);
  }

  @Get()
  async find(@Query('id') templateId?: string): Promise<{
    data: Template | { [key: string]: Template };
    status: number;
    message: string;
  }> {
    if (templateId) {
      const template = await this.templateService.findOne(templateId);
      return template;
    }

    const allTemplates = await this.templateService.findAll();
    return allTemplates;
  }

  @Patch()
  async updateByQuery(
    @Query('id') id: string,
    @Body() createTemplateDto: CreateTemplateDto,
  ): Promise<Template> {
    return this.templateService.update(id, createTemplateDto);
  }

  @Delete()
  async deleteByQuery(@Query('id') id: string): Promise<{ message: string }> {
    return this.templateService.delete(id);
  }
}
