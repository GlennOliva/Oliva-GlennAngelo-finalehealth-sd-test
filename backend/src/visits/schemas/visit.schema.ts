import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type VisitDocument = Visit & Document;

@Schema({ timestamps: true })
export class Visit {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true })
    patientId: string;

    @Prop({ required: true })
    visitDate: Date;

    @Prop()
    notes?: string;

    @Prop({ required: true, enum: ['Home', 'Telehealth', 'Clinic'] })
    visitType: string;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
VisitSchema.set('collection', 'visit'); // optional
