import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const posts = await prisma.products.findMany({
        include: {
            user: true,
            comments: true,
            likes: true,
        }
    })
    return posts
})
