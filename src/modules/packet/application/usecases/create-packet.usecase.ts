import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { IResponse } from "src/common/interfaces/response.interface";
import { PacketsRepository } from "../../domain/repository/packets.repository";
import { CreatePacketDto } from "../dto/create-packet.dto";
import { Packet } from "../../domain/models/packet.model";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { HttpStatus } from "@nestjs/common";
import { PacketSpeciality } from "../../domain/models/packet-speciality.model";
import { GeneralHelper } from "src/common/helpers/general.helper";
import { PacketSpecialitiesRepository } from "../../domain/repository/packet-specialities.repository";
import { CreateManyPacketSpecialityDto } from "../dto/create-many-packet-speciality.dto";

export class CreatePacketUseCase {

    constructor(
        private readonly packetsRepository: PacketsRepository,
        private readonly packetSpecialitiesRepository: PacketSpecialitiesRepository
    ) { }

    async exec(data: CreatePacketDto): Promise<IResponse<Packet>> {
        try {
            const response = new ResponseHelper();

            const packet = await this.packetsRepository.create({
                user_creator: data.user_creator,
                name: data.name,
                description: data.description,
                status: data.status
            });

            data.specialities.forEach(async (speciality: CreateManyPacketSpecialityDto) => {
                if (GeneralHelper.existsAndNotEmpty(speciality, 'id')) {
                    await this.packetSpecialitiesRepository.update(speciality.id, {
                        sessions: speciality.sessions,
                        packet: packet,
                        speciality: speciality.speciality
                    });
                } else {
                    await this.packetSpecialitiesRepository.create({
                        sessions: speciality.sessions,
                        packet: packet,
                        speciality: speciality.speciality
                    });
                }
            });

            response.code(HttpStatus.CREATED).result(packet);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }
}