import {prisma} from "../src/lib/prisma"

async function seed() {
    await prisma.event.create({
        data: {
            id: "",
            title: "Unite Kazuo",
            details: "evento exclusivo",
            slug: "unite-kazuo",
            maximumAttendees: 120
        }
    })
}

seed().then(() => {
    console.log("database add")
    prisma.$disconnect()
})