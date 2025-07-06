import fastify from "fastify";
<<<<<<< HEAD
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-events";
import { registerForEvent } from "./routes/register-for-event";

const app = fastify();
// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
=======
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import fastifyCors from "@fastify/cors";

import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-events";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-atteendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-events-attendees";
import { errorHandler } from "./error-handle";

const app = fastify()
// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  swagger: {
    consumes:["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "especificação da API pass.in",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
})

app.register(fastifyCors, {
  origin: '*'
})
>>>>>>> f83a3518da26f2a3c5b975263e3046fec5154f82

app.register(createEvent);
app.register(registerForEvent);

<<<<<<< HEAD
app.listen({ port: 3333 }).then(() => {
  console.log("server rodando");
});
=======
app.setErrorHandler(errorHandler)

app.listen({port : 3333}).then(() => {
  console.log("server rodando")
})
>>>>>>> f83a3518da26f2a3c5b975263e3046fec5154f82
