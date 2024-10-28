import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PetsRepository } from "../interfaces/pets-repository";

export class PrismaPetsRepository implements PetsRepository {

    async filterPets(filter: Prisma.PetWhereInput) {
        const definedFilter: Prisma.PetWhereInput = {
            ...(filter.species ? { species: filter.species } : {}),
            ...(filter.size ? { size: filter.size } : {}),
            ...(filter.color ? { color: filter.color } : {}),
            ...(filter.city ? { city: filter.city } : {}),
            ...(filter.adopted !== undefined ? { adopted: filter.adopted } : {}),
            ...(filter.age ? { age: filter.age } : {})
        };

        return prisma.pet.findMany({
            where: definedFilter,
        });
    }

    async getById(id: string) {
        const pet = await prisma.pet.findUnique({
            where: {
                id
            }
        })
        return pet
    }

    async getByCity(city: string) {

        const pets = await prisma.pet.findMany({
            where: {
                city,
                adopted: false
            }
        })
        return pets
    }
    async create(data: Prisma.PetCreateInput) {
        const user = await prisma.pet.create({
            data
        })
        return user
    }
}