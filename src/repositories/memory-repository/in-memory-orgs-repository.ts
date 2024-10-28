import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../interfaces/orgs-repository";

export class InMemoryOrgsRepository implements OrgsRepository {

    public orgs: Org[] = []

    async findByEmail(email: string) {

        const org = this.orgs.find(org => org.email === email)
        if (!org) {
            return null
        }
        return org
    }

    async create(data: Prisma.OrgCreateInput) {

        const org = {
            id: 'org-id',
            name: data.name,
            email: data.email,
            password: data.password,
            address: data.address,
            city: data.city,
            state: data.state,
            whatsapp: data.whatsapp,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.orgs.push(org)
        return org
    }
}