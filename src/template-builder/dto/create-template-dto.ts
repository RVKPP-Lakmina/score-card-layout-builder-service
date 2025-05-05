import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateTemplateDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    score?: number;

    @IsOptional()
    @IsString()
    lastEdited?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    createdAt?: string;

    @IsOptional()
    @IsNumber()
    countOfEdits?: number;

    @IsOptional()
    @IsString()
    createdBy?: string;

    @IsOptional()
    @IsString()
    sections?: string;

    @IsOptional()
    @IsString()
    lastEditedBy?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    sectionIds: string[];
}
