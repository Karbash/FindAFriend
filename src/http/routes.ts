import { FastifyInstance } from "fastify";
import { registerController } from "./controllers/register-controller";
import { AuthenticateController } from "./controllers/authenticate-controller";
import { PetController } from "./controllers/pet-controller";
import { OrgController } from "./controllers/org-controller";
import { AuthenticateOrgController } from "./controllers/authenticate-org-controller";
import { GetPetByCityController } from "./controllers/get-pet-by-city-controller";
import { PetProfileController } from "./controllers/pet-profile-controller";
import { GetPetsByFilterController } from "./controllers/get-pets-by-filters-controller";

export function appRoutes(app: FastifyInstance) {
    app.post('/user', registerController)
    app.post('/sessions', AuthenticateController)
    app.post('/pet', PetController)
    app.get('/pet/:id', PetProfileController)
    app.get('/pets/:city', GetPetByCityController)
    app.get('/pets/filter', GetPetsByFilterController)
    app.post('/org', OrgController)
    app.post('/org/sessions', AuthenticateOrgController)
    // app.patch('/pet/:id/adopted', { onRequest: [verifyUserRole("ORG")] }, validate)
    // app.patch('/pet/:id/disponible', { onRequest: [verifyUserRole("ORG")] }, validate)
    // app.get('/pet/:id/request', { onRequest: [verifyUserRole("ADOPTER")] }, validate)
}