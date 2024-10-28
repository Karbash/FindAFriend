import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error"
import { AuthenticateServiceFactory } from "@/services/factories/authenticate-service-factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function AuthenticateController(request: FastifyRequest, reply: FastifyReply) {

    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {

        const authenticateService = AuthenticateServiceFactory()
        await authenticateService.execute({
            email,
            password
        })
    }
    catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message });
        }
        throw error
    }

    return reply.status(200).send({ message: "User Logged!" })
}