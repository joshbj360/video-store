<template>
    <MainLayout>
        <div class="pt-[80px] w-[calc(100%-90px)] max-w-[690px]">
            <div v-for="product in videoProducts" :key="product.id">
                <VideoPost :post="product" />
            </div>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';
import { useGeneralStore } from '~/stores/general';
import type { Product } from '~/types';

const generalStore = useGeneralStore()

const videoProducts = computed(() => {
    if (generalStore.products) {
        return generalStore.products.filter(product => product.media && product.media.some(m => m.type === 'VIDEO'))
    }
    return []
})

onMounted(async () => {
    try {
        await generalStore.getAllUsersAndProducts()
    } catch (error) {
        console.log(error)
    }
})
</script>
