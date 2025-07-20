import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const comment = await prisma.review.delete({
        where: {
            id: event.context.params.id
        }
    })
    return comment
})
