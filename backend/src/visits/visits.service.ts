// visits.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit, VisitDocument } from './schemas/visit.schema';
import { CreateVisitDto } from './dto/create-visit.dto';

@Injectable()
export class VisitsService {
    constructor(
        @InjectModel(Visit.name) private visitModel: Model<VisitDocument>,
    ) { }

    // Get visits by patient ID
    async getByPatientId(patientId: string): Promise<Visit[]> {
        return this.visitModel.find({ patientId }).exec();
    }

    // Create a visit for a patient
    async create(patientId: string, dto: CreateVisitDto): Promise<Visit> {
        const created = new this.visitModel({ ...dto, patientId });
        return created.save();
    }

    // Optional: update and delete also
    async update(id: string, dto: Partial<CreateVisitDto>): Promise<Visit> {
        const visit = await this.visitModel.findByIdAndUpdate(id, dto, { new: true });
        if (!visit) throw new NotFoundException('Visit not found');
        return visit;
    }

    async findOneById(id: string): Promise<Visit> {
        const visit = await this.visitModel.findById(id).exec();
        if (!visit) {
            throw new NotFoundException(`Visit with id ${id} not found`);
        }
        return visit;
    }



    async remove(id: string): Promise<void> {
        const deleted = await this.visitModel.findByIdAndDelete(id);
        if (!deleted) throw new NotFoundException('Visit not found');
    }


}
