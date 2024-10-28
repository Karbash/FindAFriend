
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { PetService } from "../pet-service"

export function PetServiceFactory() {
    const petsRepository = new PrismaPetsRepository()
    const petsService = new PetService(petsRepository)

    return petsService
}