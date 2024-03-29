import { IsBoolean, IsEmail, IsOptional, IsEnum, IsString, IsStrongPassword } from "class-validator";
import { DocumentTypesEnum } from "src/common/enum/document-types.enum";
import { GendersEnum } from "src/common/enum/genders.enum";
import { RolesEnum } from "src/common/enum/roles.enum";

export class CreateUserDto {

    @IsEnum(DocumentTypesEnum)
    document_type: DocumentTypesEnum;

    @IsString()
    document_number: string;

    @IsString()
    dob: string;

    @IsString()
    name: string;

    @IsString()
    paternal_surname: string;

    @IsString()
    maternal_lastname: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    phone_number: string;

    @IsEnum(GendersEnum)
    gender: GendersEnum;

    @IsEnum(RolesEnum)
    role: RolesEnum;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;
}