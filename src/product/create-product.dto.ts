import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateProductDto {
    @IsString()
    createdAt: string;

    @IsOptional()
    apis?: Record<string, any>;

    @IsString()
    lastEdited: string;

    @IsString()
    lastEditedBy: string;

    @IsString()
    createdBy: string;

    @IsNumber()
    countOfEdits: number;

    @IsArray()
    templateIds: Record<string, any>[];

    @IsString()
    status: string;
}
