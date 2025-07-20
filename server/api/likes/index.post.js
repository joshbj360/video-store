import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const like = await prisma.like.create({
        data: {
            userId: body.userId,
            productId: body.productId,
        }
    })
    return like
})
