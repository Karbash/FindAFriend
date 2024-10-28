
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { PetProfileService } from "../pet-profile-service"

export function PetProfileServiceFactory() {
    const petsRepository = new PrismaPetsRepository()
    const petProfileService = new PetProfileService(petsRepository)

    return petProfileService
}