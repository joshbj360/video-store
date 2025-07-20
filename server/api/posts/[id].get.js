import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const post = await prisma.products.findUnique({
        where: {
            id: parseInt(event.context.params.id)
        },
        include: {
            user: true,
            comments: true,
            likes: true,
        }
    })
    return post
})
