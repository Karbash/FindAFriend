
import { PetsRepository } from "@/repositories/interfaces/pets-repository"
import { Pet } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


interface PetProfileServiceRequest {
    id: string
}

interface PetProfileServiceReply {
    pet: Pet
}

export class PetProfileService {

    private petsRepository: PetsRepository;

    constructor(petsRepository: PetsRepository) {
        this.petsRepository = petsRepository
    }

    async execute({ id }: PetProfileServiceRequest,): Promise<PetProfileServiceReply> {

        const pet = await this.petsRepository.getById(
            id
        )

        if (!pet)
            throw new ResourceNotFoundError()

        return { pet }
    }
}
