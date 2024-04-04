import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from "zod";
import { prisma } from "../lib/prisma";

export async function registerForEvent(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .post("/events/:eventId/attendees",{
        schema: {
            body: z.object({
                name: z.string(),
                email: z.string().email(),
            }),
            params: z.object({
                eventId: z.string().uuid(),
            }),
            response: {
                201: z.object({
                    attendeeId: z.number(),
                })
            }
        }
    }, async (request, reply) => {
        const {eventId} = request.params
        const {name, email} = request.body

        const AttendeeFromEmail = await prisma.attendee.findUnique({
            where: {
                eventId_email: {
                    email,
                    eventId
                }
            }
        })

        if(AttendeeFromEmail !== null) {
            throw new Error("this e-mail is already exist!") // verifico se o email já existe em um evento
        }

           const event = await prisma.event.findUnique({
            where:{
                id: eventId, // identifico o id do evento e guardo na variavel
            }
        }) 

        const amountOfAttendeesForEvent = await prisma.attendee.count({
            where: {
                eventId, // verifico a quantidade de participante que estão registrado em um evento
            }
        })

        if(event?.maximumAttendees && amountOfAttendeesForEvent >= event.maximumAttendees){
            throw new Error("the maximum number of attendees for this event has been reached.") 
            // caso tenha maximo de participante no evento e o numero de participante seja >= ao numero maximo do evento
        }

        const attendee = await prisma.attendee.create({
            data: {
                name,
                email,
                eventId,
            }
        })
        
        return reply.status(201).send({attendeeId: attendee.id})
    })
}