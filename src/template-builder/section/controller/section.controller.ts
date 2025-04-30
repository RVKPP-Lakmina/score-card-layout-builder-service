import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SectionService } from '../service/section.service';

@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get()
  getAllSections() {
    return this.sectionService.findAll();
  }

  @Get('section')
  getSectionById(@Query('id') id: string) {
    if (id) {
      return this.sectionService.getSectionById(id);
    }
    return this.sectionService.findAll();
  }

  @Post('section/create')
  createSection(@Body('sectionData') sectionData: { name: string }) {
    return this.sectionService.createSection(sectionData);
  }
}
