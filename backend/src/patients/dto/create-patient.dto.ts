import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePatientDto {
    @IsString() @IsNotEmpty() firstName: string;
    @IsString() @IsNotEmpty() lastName: string;
    @IsDateString() dob: string; // ✅ Fix here
    @IsEmail() email: string;
    @IsString() phoneNumber: string;
    @IsString() address: string;
}
