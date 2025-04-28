import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Template } from 'src/template/template.schema';
import { TemplateService } from 'src/template/template.service';

@Controller('template-builder')
export class TemplateBuilderController {
    constructor(private readonly templateService: TemplateService) { }

    @Post()
    async create(@Body() templateDto: Partial<Template>): Promise<Template> {
        return this.templateService.create(templateDto);
    }

    @Get()
    async findAll(): Promise<Template[]> {
        return this.templateService.findAll();
    }

    @Get(':name')
    async findOne(@Param('name') name: string): Promise<Template | null> {
        return this.templateService.findOne(name);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: Partial<Template>): Promise<Template> {
        return this.templateService.update(id, updateDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        return this.templateService.delete(id);
    }
}
