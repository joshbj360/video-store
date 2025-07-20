import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const follow = await prisma.follow.delete({
        where: {
            id: parseInt(event.context.params.id)
        }
    })
    return follow
})
