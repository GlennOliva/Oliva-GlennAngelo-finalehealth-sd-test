import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateVisitDto {
    @IsDateString()
    visitDate: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsEnum(['Home', 'Telehealth', 'Clinic'])
    visitType: 'Home' | 'Telehealth' | 'Clinic';
}
