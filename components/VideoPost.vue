<template>
    <div class="w-full">
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <img :src="post.seller.avatar" class="rounded-full w-10 h-10" />
                <div class="ml-3">
                    <div class="font-semibold">{{ post.seller.username }}</div>
                    <div class="text-sm text-gray-500">{{ post.store_name }}</div>
                </div>
            </div>
            <div v-if="userStore.id !== post.seller.id">
                <button v-if="!isFollowing" @click="followUser" class="bg-[#F02C56] text-white font-bold py-2 px-4 rounded">Follow</button>
                <button v-else @click="unfollowUser" class="bg-gray-200 text-black font-bold py-2 px-4 rounded">Following</button>
            </div>
        </div>
        <div class="mt-4">
            <p>{{ post.description }}</p>
        </div>
        <div class="mt-4">
            <CldVideoPlayer
                :public-id="post.media[0].url"
                width="100%"
                height="100%"
                :shoppable="{
                    transformation: {
                        crop: 'pad',
                        aspectRatio: '1:1'
                    },
                    products: [
                        {
                            productId: post.id,
                            startTime: 0,
                            endTime: 5,
                            publicId: 'YOUR_PRODUCT_IMAGE_PUBLIC_ID'
                        }
                    ]
                }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { CldVideoPlayer } from '@cloudinary/vue';
import type { Product } from '~/types';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore()

const props = defineProps<{
    post: Product
}>()

const isFollowing = computed(() => {
    // You'll need to fetch the current user's following list first.
    // This is a placeholder.
    return false
})

const followUser = () => {
    userStore.followUser(props.post.seller)
}

const unfollowUser = () => {
    userStore.unfollowUser(props.post.seller)
}
</script>
