import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const chat = await prisma.chat.create({
        data: {
            participants: {
                connect: body.participants.map((id: string) => ({ id }))
            }
        }
    })
    return chat
})
