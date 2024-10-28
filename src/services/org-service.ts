import bcryptjs from "bcryptjs"
import { OrgsRepository } from "@/repositories/interfaces/orgs-repository";
import { Org } from "@prisma/client"
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";


interface OrgServiceRequest {
    name: string;
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
    whatsapp: string;
}

interface OrgServiceReply {
    org: Org
}

export class OrgService {

    private orgsRepository: OrgsRepository;

    constructor(orgsRepository: OrgsRepository) {
        this.orgsRepository = orgsRepository
    }

    async execute({ name, email, password, address, city, state, whatsapp }: OrgServiceRequest,): Promise<OrgServiceReply> {

        const userWithSameEmail = await this.orgsRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new OrgAlreadyExistsError()
        }
        const password_hash = await bcryptjs.hash(password, 6)


        const org = await this.orgsRepository.create({
            name,
            email,
            password: password_hash,
            address,
            city,
            state,
            whatsapp,
        })
        return { org }
    }
}
