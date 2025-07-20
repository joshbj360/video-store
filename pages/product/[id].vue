<template>
    <MainLayout>
        <div class="pt-[80px] w-[calc(100%-90px)] max-w-[690px]">
            <div v-if="product">
                <h1 class="text-2xl font-bold mb-4">{{ product.title }}</h1>
                <p class="text-gray-700 mb-4">{{ product.description }}</p>
                <p class="text-lg font-bold mb-4">${{ product.price }}</p>
                <!-- Add more product details here, like images, etc. -->
            </div>
            <div v-else>
                <p>Loading product...</p>
            </div>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';
import { useGeneralStore } from '~/stores/general';
import type { Product } from '~/types';

const generalStore = useGeneralStore()
const route = useRoute()

const product = ref<Product | null>(null)

const fetchProduct = async () => {
    try {
        await generalStore.getPostById(route.params.id as string)
        product.value = generalStore.selectedPost
    } catch (error) {
        console.error(error)
    }
}

onMounted(fetchProduct)
</script>
