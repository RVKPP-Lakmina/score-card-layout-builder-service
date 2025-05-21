export class CreateUserGroupDto {
    name: string;
    description?: string;
    isActive?: boolean;
    createdBy: string;
    privileges?: string[];
}