import { Module } from '@nestjs/common';
import { TemplateModule } from './template/template.module';
import { SectionModule } from './section/section.module';

@Module({
  imports: [TemplateModule, SectionModule],
})
export class TemplateBuilderModule {}
