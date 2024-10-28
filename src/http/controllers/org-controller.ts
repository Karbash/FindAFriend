
import { OrgAlreadyExistsError } from "@/services/errors/org-already-exists-error"
import { OrgServiceFactory } from "@/services/factories/org-service-factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function OrgController(request: FastifyRequest, reply: FastifyReply) {

    const orgBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        address: z.string(),
        city: z.string(),
        state: z.string(),
        whatsapp: z.string(),

    })

    const { name, email, password, address, city, state, whatsapp } = orgBodySchema.parse(request.body)

    try {
        const orgService = OrgServiceFactory()

        await orgService.execute({
            name,
            email,
            password,
            address,
            city,
            state,
            whatsapp,
        })
    }
    catch (error) {
        if (error instanceof OrgAlreadyExistsError) {
            return reply.status(409).send({ message: error.message });
        }
        throw error
    }

    return reply.status(201).send({ message: "Org Created!" })
}