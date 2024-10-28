
import { PetsRepository } from "@/repositories/interfaces/pets-repository"
import { Pet } from "@prisma/client"


interface PetByCityServiceRequest {
    city: string
}

interface PetServiceReply {
    pets: Pet[]
}

export class GetPetByCityService {

    private petsRepository: PetsRepository;

    constructor(petsRepository: PetsRepository) {
        this.petsRepository = petsRepository
    }

    async execute({ city }: PetByCityServiceRequest,): Promise<PetServiceReply> {

        const pets = await this.petsRepository.getByCity(
            city
        )
        return { pets }
    }
}
