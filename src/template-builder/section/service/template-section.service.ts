import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoggerService } from 'src/logger/app-logger.service';
import { TemplateSection } from '../model/template-section.schema';
import { Helpers } from 'src/utility/helpers.utility';
import { SectionService } from './section.service';
import { Section } from '../model/section.schema';

@Injectable()
export class TemplateSectionService extends Helpers {
  private readonly loggerContext = 'template-section.service.ts';
  constructor(
    private readonly loggerService: LoggerService,
    @InjectModel(TemplateSection.name)
    private templateSectionModel: Model<TemplateSection>,
    private readonly sectionService: SectionService,
  ) {
    super();
  }

  async addTemplateSections(sectionIds: string[]): Promise<TemplateSection[]> {
    const allSections: Section[] = await this.sectionService.findAll();

    const templateSections: TemplateSection[] = [];
    const sectionIdsSet = new Set();

    for (const sectionId of sectionIds) {
      const section = allSections.find((s) => s._id === sectionId);
      if (section) {
        const _id = this.generateUniqueId();

        sectionIdsSet.add(_id);

        const templateSection = new this.templateSectionModel({
          _id,
          name: section.name,
          description: section.description,
          overallWeight: 0,
          sectionWeight: 0,
          lastEditedBy: '',
          rules: [],
        });
        templateSections.push(templateSection);
      }
    }

    return this.templateSectionModel.insertMany(templateSections);
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

  async getTemplateSectionById(id: string): Promise<TemplateSection | null> {
    try {
      return await this.templateSectionModel.findById(id).exec();
    } catch (error) {
      this.loggerService.error(
        'Error fetching template section',
        this.getErrorMessage(error),
        this.loggerContext,
      );
      throw error;
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
