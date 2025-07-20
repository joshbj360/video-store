import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { userId } = getQuery(event)
    const products = await prisma.products.findMany({
        where: {
            sellerId: userId
        }
    })
    return products
})
