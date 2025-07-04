import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { Patient, PatientSchema } from './schemas/patient.schema';
import { VisitsModule } from '../visits/visits.module'; // 👈 import this

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
    VisitsModule, // 👈 include VisitsModule to access VisitModel
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule { }
