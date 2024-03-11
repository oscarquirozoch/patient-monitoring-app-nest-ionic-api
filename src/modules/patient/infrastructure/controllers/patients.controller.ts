import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { PatientsRepositoryImpl } from "../repository/patient.repositoryimpl";
import { ShowPatientUseCase } from "../../application/usecases/show-patient.usecase";
import { ShowPatientDto } from "../../application/dto/show-patient.dto";
import { GetPatientsDto } from "../../application/dto/get-patients.dto";
import { GetPatientsUseCase } from "../../application/usecases/get-patients.usecase";
import { ListPatientsDto } from "../../application/dto/list-patients.dto";
import { ListPatientsUseCase } from "../../application/usecases/list-patients.usecase";
import { CreatePatientDto } from "../../application/dto/create-patient.dto";
import { CreatePatientUseCase } from "../../application/usecases/create-patient.usecase";
import { UpdatePatientDto } from "../../application/dto/update-patient.dto";
import { UpdatePatientUseCase } from "../../application/usecases/update-patient.usecase";
import { DeletePatientDto } from "../../application/dto/delete-patient.dto";
import { DeletePatientUseCase } from "../../application/usecases/delete-patient.usecase";

@Controller('patients')
export class PatientsController {

    constructor(
        private readonly patientsRepository: PatientsRepositoryImpl
    ) { }

    @Get('/show/:id')
    show(@Param('id') id: string) {
        return new ShowPatientUseCase(this.patientsRepository).exec({ id } as ShowPatientDto);
    }

    @Get('/get')
    get(@Query() getPatientsDto: GetPatientsDto) {
        return new GetPatientsUseCase(this.patientsRepository).exec(getPatientsDto);
    }

    @Get('/list')
    list(@Query() listPatientsDto: ListPatientsDto) {
        return new ListPatientsUseCase(this.patientsRepository).exec(listPatientsDto);
    }

    @Post()
    create(@Body() createPatientDto: CreatePatientDto) {
        return new CreatePatientUseCase(this.patientsRepository).exec(createPatientDto);
    }

    @Put()
    update(@Body() updatePatientDto: UpdatePatientDto) {
        return new UpdatePatientUseCase(this.patientsRepository).exec(updatePatientDto);
    }

    @Delete()
    delete(@Body() deletePatientDto: DeletePatientDto) {
        return new DeletePatientUseCase(this.patientsRepository).exec(deletePatientDto);
    }
}