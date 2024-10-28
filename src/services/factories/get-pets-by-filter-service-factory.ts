
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { GetPetsByFilterService } from "../get-pets-by-filter-service"

export function GetPetsByFiltersServiceFactory() {
    const petsRepository = new PrismaPetsRepository()
    const getPetsByFilterService = new GetPetsByFilterService(petsRepository)

    return getPetsByFilterService
}