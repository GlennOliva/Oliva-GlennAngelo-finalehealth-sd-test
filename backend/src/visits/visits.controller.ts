

import { Controller, Put, Delete, Param, Body, Get } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { Visit } from './schemas/visit.schema';

@Controller('visits')
export class VisitsController {
    constructor(private readonly visitsService: VisitsService) { }



    // PUT /visits/:id
    @Put(':id')
    updateVisit(@Param('id') id: string, @Body() dto: Partial<CreateVisitDto>) {
        return this.visitsService.update(id, dto);
    }

    // DELETE /visits/:id
    @Delete(':id')
    deleteVisit(@Param('id') id: string) {
        return this.visitsService.remove(id);
    }

    // visits.controller.ts
    @Get(':id')
    async getVisitById(@Param('id') id: string): Promise<Visit> {
        return this.visitsService.findOneById(id);
    }

}

