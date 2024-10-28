
import { OrgService } from "../org-service"
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"

export function OrgServiceFactory() {
    const orgsRepository = new PrismaOrgsRepository()
    const orgsService = new OrgService(orgsRepository)

    return orgsService
}