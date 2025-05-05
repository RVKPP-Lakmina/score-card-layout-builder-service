import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateBuilderService } from './template-builder.service';
import { TemplateBuilderController } from './template-builder.controller';
import { Template, TemplateSchema } from 'src/template-builder/template/template.schema';
import { TemplateModule } from './template/template.module';
import { TemplateService } from '../template-builder/template/template.service';
import { SectionModule } from './section/section.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Template.name, schema: TemplateSchema }]),
    TemplateModule,
    SectionModule,
  ],
  controllers: [TemplateBuilderController],
  providers: [TemplateBuilderService, TemplateService],
  exports: [TemplateBuilderService, MongooseModule],
})
export class TemplateBuilderModule { }
