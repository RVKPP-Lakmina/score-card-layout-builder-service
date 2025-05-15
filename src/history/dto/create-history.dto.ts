export class CreateHistoryDto {
    action: string;
    entityType: string;
    entityName: string;
    timestamp: Date;
    user: string;
    details?: string;
}