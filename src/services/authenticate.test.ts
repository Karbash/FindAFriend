import { beforeEach, describe, expect, test } from "vitest"
import bcryptjs from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/memory-repository/in-memory-users-repository"
import { AuthenticateService } from "./authenticate-service"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"


describe("Authenticate User  - Test Unit", () => {

    let usersRepository: InMemoryUsersRepository
    let authenticateService: AuthenticateService

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        authenticateService = new AuthenticateService(usersRepository)
    })


    test("it should be able to authenticate to ADOPTER", async () => {

        usersRepository.create(
            {
                name: "John Doe",
                email: "johndoe@email.com",
                password_hash: await bcryptjs.hash("123456", 6),
                role: "ADOPTER"
            })

        const { user } = await authenticateService.execute({
            email: "johndoe@email.com",
            password: "123456",
        })

        expect(user.id).toEqual(expect.any(String))
    })

    test("it should be able to authenticate to ORG_MEMBER", async () => {

        usersRepository.create(
            {
                name: "John Doe",
                email: "johndoe@email.com",
                password_hash: await bcryptjs.hash("123456", 6),
                role: "ORG_MEMBER"
            })

        const { user } = await authenticateService.execute({
            email: "johndoe@email.com",
            password: "123456",
        })

        expect(user.id).toEqual(expect.any(String))
    })

    test("it should be able to authenticate to ADMIN", async () => {

        usersRepository.create(
            {
                name: "John Doe",
                email: "johndoe@email.com",
                password_hash: await bcryptjs.hash("123456", 6),
                role: "ADMIN"
            })

        const { user } = await authenticateService.execute({
            email: "johndoe@email.com",
            password: "123456",
        })

        expect(user.id).toEqual(expect.any(String))
    })

    test("it should not to be able authenticate with wrong email", async () => {

        usersRepository.create(
            {
                name: "John Doe",
                email: "johndoe@email.com",
                password_hash: await bcryptjs.hash("123456", 6),
                role: "ADMIN"
            })

        expect(async () => {
            await authenticateService.execute({
                email: "johndodee@email.com",
                password: "123456",
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    test("it should not to be able authenticate with wrong password", async () => {

        usersRepository.create(
            {
                name: "John Doe",
                email: "johndoe@email.com",
                password_hash: await bcryptjs.hash("123456", 6),
                role: "ADMIN"
            })

        expect(async () => {
            await authenticateService.execute({
                email: "johndoe@email.com",
                password: "1234586",
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})