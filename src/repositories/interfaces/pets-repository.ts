import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
    create(data: Prisma.PetCreateInput): Promise<Pet>
    getByCity(city: string): Promise<Pet[] | []>
    getById(id: string): Promise<Pet | null>
    filterPets(filter: Prisma.PetWhereInput): Promise<Pet[]>
}