import bcryptjs from "bcryptjs"
import { Org } from "@prisma/client"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"
import { OrgsRepository } from "@/repositories/interfaces/orgs-repository"


interface AuthenticateOrgServiceRequest {
    password: string
    email: string
}

interface AuthenticateOrgServiceReply {
    org: Org
}

export class AuthenticateOrgService {

    private orgRepository: OrgsRepository;

    constructor(orgRepository: OrgsRepository) {
        this.orgRepository = orgRepository
    }

    async execute({ email, password }: AuthenticateOrgServiceRequest): Promise<AuthenticateOrgServiceReply> {

        const org = await this.orgRepository.findByEmail(email)

        if (!org) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatch = await bcryptjs.compare(password, org.password)


        if (doesPasswordMatch === false) {
            throw new InvalidCredentialsError()
        }

        return { org }
    }
}
