
import { PetsRepository } from "@/repositories/interfaces/pets-repository"
import { Pet, Size } from "@prisma/client"


interface PetServiceRequest {
    name: string
    age: number
    description: string
    species: string // Exemplo: "Cachorro", "Gato", etc.
    breed: string | null // Raça do pet (opcional)
    size: Size
    color: string | null
    city: string
    adopted: boolean
    orgId: string
}

interface PetServiceReply {
    pet: Pet
}

export class PetService {

    private petsRepository: PetsRepository;

    constructor(petsRepository: PetsRepository) {
        this.petsRepository = petsRepository
    }

    async execute({ name, age, description, species, breed, size, color, city, adopted = false, orgId }: PetServiceRequest,): Promise<PetServiceReply> {

        const pet = await this.petsRepository.create({
            name,
            age,
            description,
            species,
            breed,
            size,
            color,
            city,
            adopted,
            org: { connect: { id: orgId } }
        })
        return { pet }
    }
}
