
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { GetPetByCityService } from "../get-pet-by-city-service"

export function GetPetByCityServiceFactory() {
    const petsRepository = new PrismaPetsRepository()
    const getPetsByCityService = new GetPetByCityService(petsRepository)

    return getPetsByCityService
}