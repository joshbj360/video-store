import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const post = await prisma.products.create({
        data: {
            title: body.title,
            slug: body.slug,
            description: body.description,
            price: body.price,
            stock: body.stock,
            discount: body.discount,
            sellerId: body.sellerId,
            store_name: body.store_name,
            media: {
                create: {
                    url: body.video,
                    type: 'VIDEO',
                }
            }
        }
    })
    return post
})
