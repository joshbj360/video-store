import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const post = await prisma.products.delete({
        where: {
            id: parseInt(event.context.params.id)
        }
    })
    return post
})
