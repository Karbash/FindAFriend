
import { GetPetByCityServiceFactory } from "@/services/factories/get-pet-by-city-service-factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function GetPetByCityController(request: FastifyRequest, reply: FastifyReply) {

    const petBodySchema = z.object({
        city: z.string(),
    })

    const { city } = petBodySchema.parse(request.query)


    const petService = GetPetByCityServiceFactory()

    const { pets } = await petService.execute(
        { city }
    )


    return reply.status(201).send({ pets })
}