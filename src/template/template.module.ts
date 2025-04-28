import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateService } from './template.service';
import { Template, TemplateSchema } from './template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Template.name, schema: TemplateSchema }]),
  ],
  controllers: [],
  providers: [TemplateService],
})
export class TemplateModule { }
