import { beforeEach, describe, expect, test } from "vitest"
import { RegisterService } from "./register-service"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/memory-repository/in-memory-users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"


describe("Register User  - Test Unit", () => {

    let usersRepository: InMemoryUsersRepository
    let registerService: RegisterService

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        registerService = new RegisterService(usersRepository)
    })


    test("it should be able to register user to ADOPTER", async () => {

        const { user } = await registerService.execute({
            name: "John Doe",
            email: "johndoe@email.com",
            password: "123456",
            role: "ADOPTER"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    test("it should be able to register user to ORG_MEMBER", async () => {

        const { user } = await registerService.execute({
            name: "John Doe",
            email: "johndoe@email.com",
            password: "123456",
            role: "ORG_MEMBER"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    test("it should hash user password upon registration", async () => {

        const { user } = await registerService.execute({
            name: "John Doe",
            email: "johndoe@email.com",
            password: "123456",
            role: "ADOPTER"
        })

        const isPasswordCorrectHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectHashed).toBe(true)
    })

    test("it should be not able to register with same e-mail", async () => {

        const email = "johndoe@email.com"

        await registerService.execute({
            name: "John Doe",
            email,
            password: "123456",
            role: "ADOPTER"
        })

        expect(async () => {

            await registerService.execute({
                name: "John Doe 2",
                email,
                password: "123456",
                role: "ORG_MEMBER"
            })

        }).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})