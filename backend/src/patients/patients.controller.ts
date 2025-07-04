import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { VisitsService } from '../visits/visits.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { CreateVisitDto } from '../visits/dto/create-visit.dto';

@Controller('patients')
export class PatientsController {
    constructor(
        private readonly patientsService: PatientsService,
        private readonly visitsService: VisitsService,
    ) { }

    @Get()
    findAll() {
        return this.patientsService.findAll();
    }

    @Get('summary')
    getSummary() {
        return this.patientsService.getPatientVisitSummary();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const patient = await this.patientsService.getById(id);
        if (!patient) {
            throw new NotFoundException('Patient not found');
        }
        return patient;
    }


    @Post()
    create(@Body() dto: CreatePatientDto) {
        return this.patientsService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
        return this.patientsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.patientsService.remove(id);
    }

    // GET /patients/:id/visits
    @Get(':id/visits')
    getVisits(@Param('id') id: string) {
        return this.visitsService.getByPatientId(id);
    }

    // POST /patients/:id/visits
    @Post(':id/visits')
    createVisit(@Param('id') id: string, @Body() dto: CreateVisitDto) {
        return this.visitsService.create(id, dto);
    }




}
