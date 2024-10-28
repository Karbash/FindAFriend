
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error"
import { ResgisterServiceFactory } from "@/services/factories/register-service-factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function registerController(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(["ADMIN", "ADOPTER", "ORG_MEMBER"])
    })

    const { name, email, password, role } = registerBodySchema.parse(request.body)

    try {
        const registerService = ResgisterServiceFactory()

        await registerService.execute({
            name,
            email,
            password,
            role
        })
    }
    catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message });
        }
        throw error
    }

    return reply.status(201).send({ message: "User Created!" })
}