import { TemplateSection } from '../../model/template-section.schema';

export const createSection = (name: string): TemplateSection => {
  return {
    _id: '1212121213d',
    name: name,
    description: '',
    overallWeight: 0,
    sectionWeight: 0,
    lastEditedBy: '',
    rules: [],
  } as TemplateSection;
};
