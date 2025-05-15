// src/logs/log.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History } from './schemas/history.schema';
import { CreateHistoryDto } from './dto/create-history.dto';

@Injectable()
export class HistoryService {
    constructor(@InjectModel(History.name) private readonly logModel: Model<History>) { }

    async history(payload: CreateHistoryDto) {
        try {
            const createdHistory = new this.logModel({
                ...payload,
                actionDate: new Date(),
            });

            const savedHistory = await createdHistory.save();

            console.log(`history | ${JSON.stringify({ ...payload, id: savedHistory._id })}`);

            return {
                data: savedHistory,
                status: 1,
            };
        } catch (error) {
            console.error(`history | ${error}`);
            return {
                data: {},
                status: 'fail',
            };
        }
    }
}
