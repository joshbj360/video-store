import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const message = await prisma.message.create({
        data: {
            chatId: parseInt(event.context.params.id),
            senderId: body.senderId,
            text: body.text,
        }
    })
    return message
})
