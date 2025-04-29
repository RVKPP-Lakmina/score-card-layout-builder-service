import { Module } from '@nestjs/common';
import { SectionController } from './section.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Section, SectionSchema } from './model/section.schema';
import { SectionService } from './service/section.service';
import { UtilityModule } from 'src/utility/utility.module';
import { TemplateSectionService } from './service/template-section.service';
import {
  TemplateSection,
  TemplateSectionSchema,
} from './model/template-section.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Section.name,
        schema: SectionSchema,
      },

      {
        name: TemplateSection.name,
        schema: TemplateSectionSchema,
      },
    ]),
    UtilityModule,
  ],
  providers: [SectionService, TemplateSectionService],
  controllers: [SectionController],
})
export class SectionModule {}
