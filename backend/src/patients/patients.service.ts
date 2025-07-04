import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from './schemas/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Visit } from 'src/visits/schemas/visit.schema';

@Injectable()
export class PatientsService {

    constructor(
        @InjectModel(Patient.name) private patientModel: Model<Patient>,
        @InjectModel(Visit.name) private visitModel: Model<Visit>
    ) { }

    async findAll(): Promise<Patient[]> {
        return this.patientModel.find().exec();
    }

    async create(dto: CreatePatientDto): Promise<Patient> {
        const created = new this.patientModel(dto);
        return created.save();
    }

    async update(id: string, dto: UpdatePatientDto): Promise<Patient> {
        const patient = await this.patientModel.findByIdAndUpdate(id, dto, { new: true });
        if (!patient) throw new NotFoundException('Patient not found');
        return patient;
    }

    async remove(id: string): Promise<void> {
        const result = await this.patientModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException('Patient not found');
    }

    async getPatientVisitSummary() {
        return this.visitModel.aggregate([
            {
                $group: {
                    _id: '$patientId',
                    totalVisits: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'patient', // ✅ Use your exact collection name
                    localField: '_id',
                    foreignField: '_id',
                    as: 'patientInfo'
                }
            },
            { $unwind: '$patientInfo' },
            {
                $project: {
                    _id: 1,
                    totalVisits: 1,
                    email: '$patientInfo.email',
                    fullName: {
                        $concat: ['$patientInfo.firstName', ' ', '$patientInfo.lastName']
                    }
                }
            }
        ]);
    }



    async getById(id: string): Promise<Patient> {
        const patient = await this.patientModel.findById(id).exec();
        if (!patient) {
            throw new NotFoundException('Patient not found');
        }
        return patient;
    }





}
