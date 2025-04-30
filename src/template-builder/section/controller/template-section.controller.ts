import { Controller, Get, Param } from '@nestjs/common';
import { TemplateSectionService } from '../service/template-section.service';

@Controller('templates-sections')
export class TemplateSectionController {
  constructor(
    private readonly templateSectionService: TemplateSectionService,
  ) {}

  @Get()
  async getAllTemplateSections() {
    return await this.templateSectionService.getAllTemplateSections();
  }

  @Get(':id')
  async getTemplateSectionById(@Param(':id') id: string) {
    return await this.templateSectionService.getTemplateSectionById(id);
  }

  @Get('templates-section/create')
  async createTemplateSection(templateSection: {
    name: string;
    description?: string;
  }) {
    return await this.templateSectionService.createTemplateSection(
      templateSection,
    );
  }
}
