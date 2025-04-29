import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SectionService } from './service/section.service';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}
  @Get()
  getAllSections() {
    return this.sectionService.findAll();
  }

  @Get(':id')
  getSectionById(@Param('id') id: string) {
    return this.sectionService.getSectionById(id);
  }

  @Post('create')
  createSection(@Body('sectionData') sectionData: any) {
    return this.sectionService.createSection(sectionData);
  }

  @Put('update/:id')
  updateSection(
    @Param('id') id: string,
    @Body('sectionData') sectionData: any,
  ) {
    return this.sectionService.updateSection(id, sectionData);
  }

  @Delete('delete/:id')
  deleteSection(@Param('id') id: string) {
    return this.sectionService.deleteSection(id);
  }
}
