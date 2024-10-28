
import { GetPetsByFiltersServiceFactory } from "@/services/factories/get-pets-by-filter-service-factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function GetPetsByFilterController(request: FastifyRequest, reply: FastifyReply) {

    const petQuerySchema = z.object({
        species: z.string().optional(),
        size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
        color: z.string().optional(),
        age: z.string().optional(),
        city: z.string().optional(),
        adopted: z.coerce.boolean().optional(),
    })

    const filters = petQuerySchema.parse(request.query)


    const petService = GetPetsByFiltersServiceFactory()

    const { pets } = await petService.execute(
        filters
    )


    return reply.status(201).send({ pets })
}