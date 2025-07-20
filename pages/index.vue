<template>
    <MainLayout>
        <div class="pt-[80px] w-[calc(100%-90px)] max-w-[690px]">
            <div v-for="post in videoPosts" :key="post.id">
                <VideoPost :post="post" />
            </div>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';
import { useGeneralStore } from '~/stores/general';
import type { Product } from '~/types';

const generalStore = useGeneralStore()

const videoPosts = computed(() => {
    if (generalStore.posts) {
        return generalStore.posts.filter(post => post.media && post.media.some(m => m.type === 'VIDEO'))
    }
    return []
})

onMounted(async () => {
    try {
        await generalStore.getAllUsersAndPosts()
    } catch (error) {
        console.log(error)
    }
})
</script>
