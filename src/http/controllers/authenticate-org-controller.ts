import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error"
import { AuthenticateOrgServiceFactory } from "@/services/factories/authenticate-org-service-factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function AuthenticateOrgController(request: FastifyRequest, reply: FastifyReply) {

    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {

        const authenticateOrgService = AuthenticateOrgServiceFactory()
        await authenticateOrgService.execute({
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

    return reply.status(200).send({ message: "Org Logged!" })
}