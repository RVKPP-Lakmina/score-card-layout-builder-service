import { Test, TestingModule } from '@nestjs/testing';
import { TemplateBuilderService } from './template-builder.service';

describe('TemplateBuilderService', () => {
  let service: TemplateBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateBuilderService],
    }).compile();

    service = module.get<TemplateBuilderService>(TemplateBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
