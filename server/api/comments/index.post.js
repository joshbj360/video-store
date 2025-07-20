import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const comment = await prisma.review.create({
        data: {
            userId: body.userId,
            productId: body.productId,
            sellerProfileId: body.sellerProfileId,
            rating: body.rating,
            comment: body.comment,
        }
    })
    return comment
})
