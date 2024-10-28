import { Prisma, Role, User } from "@prisma/client";
import { UsersRepository } from "../interfaces/users-repository";

export class InMemoryUsersRepository implements UsersRepository {

    public users: User[] = []

    async findByEmail(email: string) {

        const user = this.users.find(user => user.email === email)
        if (!user) {
            return null
        }

        return user
    }

    async create(data: Prisma.UserCreateInput) {

        const user = {
            id: 'user-id',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            role: Role.ADOPTER,
            orgId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.users.push(user)
        return user
    }
}