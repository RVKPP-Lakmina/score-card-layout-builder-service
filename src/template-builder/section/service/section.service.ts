import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Section } from '../model/section.schema';
import { LoggerService } from 'src/logger/app-logger.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createSection } from '../dto/post/create-section.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { Helpers } from 'src/utility/helpers.utility';

@Injectable()
export class SectionService extends Helpers {
  constructor(
    private readonly loggerService: LoggerService,
    @InjectModel(Section.name) private sectionModel: Model<Section>,
    @InjectRedis() private readonly redis: Redis,
  ) {
    super();
  }

  async findAll(): Promise<Section[]> {
    const sections: string | null = await this.redis.get('sections');

    if (sections) {
      return JSON.parse(sections) as Section[];
    }

    const allSections = await this.sectionModel.find().exec();

    if (allSections) {
      await this.redis.set(
        'sections',
        JSON.stringify(allSections),
        'EX',
        60 * 60,
      );
    }
    return allSections;
  }

  async getSectionById(sectionId: string): Promise<Section> {
    let section: Section | null;

    const redisresponse = await this.redis.get(`sections`);

    if (redisresponse) {
      const sectionItem = JSON.parse(redisresponse) as Section[];
      section = sectionItem.find(
        (item: Section) => item._id === sectionId,
      ) as Section | null;

      if (section) {
        return section;
      }
    }

    section = await this.sectionModel.findById(sectionId).exec();
    if (!section) {
      this.loggerService.error(
        'Section not found',
        'getSectionById',
        'section.service.ts',
      );
      throw new BadRequestException(`Section with ID ${sectionId} not found`);
    }
    return section;
  }

  async createSection(sectionData: { name: string }): Promise<any> {
    try {
      if (!sectionData.name) {
        this.loggerService.error(
          'Section name is required',
          'createSection',
          'section.service.ts',
        );
        throw new BadRequestException('Section name is required');
      }
      const sectionKey = this.keyGenarate(sectionData.name);

      const existingSection = await this.sectionModel
        .findOne({ _id: sectionKey })
        .exec();

      if (existingSection) {
        this.loggerService.error(
          'Section with this key already exists',
          'createSection',
          'section.service.ts',
        );
        throw new HttpException(
          'Section with this key already exists',
          HttpStatus.CONFLICT,
        );
      }

      let response: Section = createSection(sectionKey, sectionData.name);

      response = await this.sectionModel.create(response);

      await this.redis.del('sections');

      return response;
    } catch (error) {
      this.loggerService.error(
        'Error creating section',
        'createSection',
        'section.service.ts',
      );

      throw new HttpException(
        'Error creating section: ' + this.getErrorMessage(error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
