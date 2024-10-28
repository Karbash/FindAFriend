
import { PetRegisterError } from "@/services/errors/pet-register-error"
import { PetServiceFactory } from "@/services/factories/pet-service-factory"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function PetController(request: FastifyRequest, reply: FastifyReply) {

    const petBodySchema = z.object({
        name: z.string(),
        age: z.number(),
        description: z.string(),
        species: z.string(),
        breed: z.string(),
        size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
        color: z.string(),
        city: z.string(),
        adopted: z.boolean().default(false),
        orgId: z.string().uuid().nullable(),
    })

    const { name, age, description, species, breed, size, color, city, adopted, orgId } = petBodySchema.parse(request.body)

    try {
        const petService = PetServiceFactory()

        await petService.execute({
            name,
            age,
            description,
            species,
            breed,
            size,
            color,
            city,
            adopted,
            orgId: orgId ?? "",
        })
    }
    catch (error) {
        if (error instanceof PetRegisterError) {
            return reply.status(409).send({ message: error.message });
        }
        throw error
    }

    return reply.status(201).send({ message: "Pet Registred!" })
}