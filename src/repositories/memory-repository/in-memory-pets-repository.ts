import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../interfaces/pets-repository";

export class InMemoryPetsRepository implements PetsRepository {

    public pets: Pet[] = []

    async create(data: Prisma.PetCreateInput) {

        const pet = {
            name: data.name,
            id: "pet-id",
            age: data.age,
            description: data.description,
            species: data.species,
            breed: data.breed ?? null,
            size: data.size,
            color: data.color ?? null,
            city: data.city,
            adopted: data.adopted ?? false,
            orgId: data.org.connect?.id ?? "",
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.pets.push(pet)
        return pet
    }
}