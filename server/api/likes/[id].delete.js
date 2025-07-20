import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const like = await prisma.like.delete({
        where: {
            id: parseInt(event.context.params.id)
        }
    })
    return like
})
