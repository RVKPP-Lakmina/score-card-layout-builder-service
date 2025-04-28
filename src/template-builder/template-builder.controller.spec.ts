import { Test, TestingModule } from '@nestjs/testing';
import { TemplateBuilderController } from './template-builder.controller';

describe('TemplateBuilderController', () => {
  let controller: TemplateBuilderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateBuilderController],
    }).compile();

    controller = module.get<TemplateBuilderController>(TemplateBuilderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
