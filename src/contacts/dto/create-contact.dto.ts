import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
