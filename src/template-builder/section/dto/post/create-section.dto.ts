import { Section } from '../../model/section.schema';

export const createSection = (id: string, name: string): Section => {
  return {
    _id: id,
    name: name,
    description: '',
  } as Section;
};
