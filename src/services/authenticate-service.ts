import bcryptjs from "bcryptjs"
import { UsersRepository } from "@/repositories/interfaces/users-repository"
import { User } from "@prisma/client"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"


interface AuthenticateServiceRequest {
    password: string
    email: string
}

interface AuthenticateServiceReply {
    user: User
}

export class AuthenticateService {

    private usersRepository: UsersRepository;

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }

    async execute({ email, password }: AuthenticateServiceRequest): Promise<AuthenticateServiceReply> {

        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatch = await bcryptjs.compare(password, user.password_hash)


        if (doesPasswordMatch === false) {
            throw new InvalidCredentialsError()
        }

        return { user }
    }
}
