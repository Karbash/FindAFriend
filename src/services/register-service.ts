import bcryptjs from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { UsersRepository } from "@/repositories/interfaces/users-repository"
import { Role, User } from "@prisma/client"


interface RegisterServiceRequest {
    name: string
    email: string
    password: string
    role: Role
}

interface RegisterServiceReply {
    user: User
}

export class RegisterService {

    private usersRepository: UsersRepository;

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }

    async execute({ name, email, password, role }: RegisterServiceRequest,): Promise<RegisterServiceReply> {

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }
        const password_hash = await bcryptjs.hash(password, 6)

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
            role
        })
        return { user }
    }
}
