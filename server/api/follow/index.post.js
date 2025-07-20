import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const follow = await prisma.follow.create({
        data: {
            followerId: body.followerId,
            followingId: body.followingId,
        }
    })
    return follow
})
