
import { PetsRepository } from "@/repositories/interfaces/pets-repository"
import { Pet, Prisma } from "@prisma/client"


interface PetByFilterServiceRequest {
    species?: string
    size?: "SMALL" | "MEDIUM" | "LARGE"
    color?: string
    age?: string
    city?: string
    adopted?: boolean
}

interface PetByFilterServiceReply {
    pets: Pet[]
}

export class GetPetsByFilterService {

    private petsRepository: PetsRepository;

    constructor(petsRepository: PetsRepository) {
        this.petsRepository = petsRepository
    }

    async execute(filters: PetByFilterServiceRequest,): Promise<PetByFilterServiceReply> {

        const prismaFilters: Prisma.PetWhereInput = {
            species: filters.species,
            size: filters.size,
            color: filters.color,
            age: Number(filters.age),
            city: filters.city,
            adopted: Boolean(filters.adopted)
        }

        // Realiza a consulta ao repositório com os filtros
        const pets = await this.petsRepository.filterPets(prismaFilters)

        return { pets }
    }
}
