

import { PetProfileServiceFactory } from "@/services/factories/pet-profile-service-factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function PetProfileController(request: FastifyRequest, reply: FastifyReply) {

    const petQuerySchema = z.object({
        id: z.string().uuid(),
    })

    const { id } = petQuerySchema.parse(request.query)


    const petService = PetProfileServiceFactory()

    const { pet } = await petService.execute(
        { id }
    )


    return reply.status(201).send({ pet })
}