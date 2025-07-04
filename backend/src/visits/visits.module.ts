import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';
import { Visit, VisitSchema } from './schemas/visit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Visit.name, schema: VisitSchema }])
  ],
  controllers: [VisitsController],
  providers: [VisitsService],
  exports: [MongooseModule, VisitsService], // 👈 export the MongooseModule so other modules can use VisitModel
})
export class VisitsModule { }

