import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Patient {
    @Prop({ required: true }) firstName: string;
    @Prop({ required: true }) lastName: string;
    @Prop({ required: true }) dob: Date;
    @Prop({ required: true, unique: true }) email: string;
    @Prop({ required: true }) phoneNumber: string;
    @Prop({ required: true }) address: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
PatientSchema.set('collection', 'patient'); // 👈 manual collection name