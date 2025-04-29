import { Module } from '@nestjs/common';
import { SectionController } from './section.controller';

@Module({
  controllers: [SectionController],
})
export class SectionModule {}
