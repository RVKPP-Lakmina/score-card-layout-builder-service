import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoggerService } from 'src/logger/app-logger.service';
import { TemplateSection } from '../model/template-section.schema';
import { Helpers } from 'src/utility/helpers.utility';
import { SectionService } from './section.service';
import { Section, SectionDocument } from '../model/section.schema';
import {
  Template,
  TemplateDocument,
} from 'src/template-builder/template/template.schema';

@Injectable()
export class TemplateSectionService extends Helpers {
  private readonly loggerContext = 'template-section.service.ts';
  constructor(
    private readonly loggerService: LoggerService,
    private readonly sectionService: SectionService,
    @InjectModel(TemplateSection.name)
    private templateSectionModel: Model<TemplateSection>,
    @InjectModel(Section.name)
    private sectionModel: Model<SectionDocument>,
    @InjectModel(Template.name)
    private templateModel: Model<TemplateDocument>,
  ) {
    super();
  }

  async addTemplateSections(
    templateId: string,
    sectionIds: string[],
  ): Promise<{
    data: TemplateSection[] | null;
    status: number;
    message?: string;
  }> {
    try {
      const sections = await this.sectionModel
        .find({ _id: { $in: sectionIds } })
        .exec();

      if (sections.length !== sectionIds.length) {
        throw new NotFoundException('Some section IDs are invalid');
      }

      const templateSectionDocs: TemplateSection[] =
        await this.templateSectionModel.insertMany(
          sections.map((section) => ({
            name: section.name,
            description: section.description,
            overallWeight: 0,
            sectionWeight: 0,
            lastEditedBy: '',
            rules: [],
            parentSectionId: section._id,
            parentTemplateId: templateId,
          })),
          { rawResult: false },
        );

      const templateSectionIds: string[] = templateSectionDocs.map(
        ({ _id }) => _id,
      );

      const template = await this.templateModel
        .findById(
          templateId,
          {
            $push: {
              sectionIds: { $each: templateSectionIds },
            },
          },
          {
            new: true,
          },
        )
        .exec();

      if (!template) {
        throw new NotFoundException('Template not found');
      }

      return {
        data: templateSectionDocs,
        status: 1,
        message: 'Template sections added successfully',
      };
    } catch (error) {
      this.loggerService.error(
        'Error adding template sections',
        this.getErrorMessage(error),
        this.loggerContext,
      );
      return {
        data: [] as TemplateSection[],
        status: -1,
        message: 'Error adding template sections',
      };
    }
  }

  async createTemplateSection(templateSection: {
    name: string;
    description?: string;
  }): Promise<TemplateSection> {
    try {
      if (!templateSection.name) {
        throw new HttpException(
          'Template section name is required',
          HttpStatus.CONFLICT,
        );
      }

      const id = this.keyGenarate(templateSection.name);

      const newTemplateSection = new this.templateSectionModel({
        _id: id,
        name: templateSection.name,
        description: templateSection.description,
        overallWeight: 0,
        sectionWeight: 0,
        lastEditedBy: '',
        rules: [],
      });

      return await newTemplateSection.save();
    } catch (error: unknown) {
      this.loggerService.error(
        'Error creating template section',
        this.getErrorMessage(error),
        this.loggerContext,
      );
      throw new HttpException(
        'Error creating template section',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTemplateSectionById(id: string): Promise<{
    data: TemplateSection | null;
    status: number;
    message?: string;
  }> {
    try {
      const templateSection = await this.templateSectionModel
        .findById(id)
        .exec();

      if (!templateSection) {
        throw new NotFoundException('Template section not found');
      }

      return {
        data: templateSection,
        status: 1,
      };
    } catch (error) {
      this.loggerService.error(
        'Error fetching template section',
        this.getErrorMessage(error),
        this.loggerContext,
      );
      return {
        data: {} as TemplateSection,
        status: -1,
        message: 'Template section not found',
      };
    }
  }

  async updateTemplateSection(
    id: string,
    templateSection: TemplateSection,
  ): Promise<TemplateSection | null> {
    try {
      return await this.templateSectionModel
        .findByIdAndUpdate(id, templateSection, { new: true })
        .exec();
    } catch (error) {
      this.loggerService.error(
        'Error updating template section',
        this.getErrorMessage(error),
        this.loggerContext,
      );
      throw error;
    }
  }

  async deleteTemplateSection(id: string): Promise<TemplateSection | null> {
    try {
      return await this.templateSectionModel.findByIdAndDelete(id).exec();
    } catch (error) {
      this.loggerService.error(
        'Error deleting template section',
        this.getErrorMessage(error),
        this.loggerContext,
      );
      throw error;
    }
  }
  async getAllTemplateSections(): Promise<TemplateSection[]> {
    try {
      return await this.templateSectionModel.find().exec();
    } catch (error) {
      this.loggerService.error(
        'Error fetching all template sections',
        this.getErrorMessage(error),
        this.loggerContext,
      );
      throw error;
    }
  }
  async getTemplateSectionByName(
    name: string,
  ): Promise<TemplateSection | null> {
    try {
      return await this.templateSectionModel.findOne({ name: name }).exec();
    } catch (error) {
      this.loggerService.error(
        'Error fetching template section',
        this.getErrorMessage(error),
        this.loggerContext,
      );
      throw error;
    }
  }
}
