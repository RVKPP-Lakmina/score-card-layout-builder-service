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

@Controller('template-builder')F
export class TemplateBuilderController {
  constructor(private readonly templateService: TemplateService) {}

    @Post()
    async create(@Body() createTemplateDto: CreateTemplateDto): Promise<{ data: Template; status: number; message: string }> {
        return this.templateService.create(createTemplateDto);
    }

  @Get()
  async findAll(): Promise<Template[]> {
    return this.templateService.findAll();
  }

  @Get()
  async find(
    @Query('name') name?: string,
  ): Promise<Template | Template[] | null> {
    if (name) {
      return this.templateService.findOne(name);
    }
    return this.templateService.findAll();
  }

  @Patch()
  async updateByQuery(
    @Query('id') id: string,
    @Body() updateDto: Partial<Template>,
  ): Promise<Template> {
    return this.templateService.update(id, updateDto);
  }

    @Delete()
    async deleteByQuery(@Query('id') id: string): Promise<{ message: string }> {
        return this.templateService.delete(id);
    }
}
