<template>
    <MainLayout>
        <div class="pt-[80px] w-full">
            <h1 class="text-2xl font-bold mb-4 text-center">Product Catalog</h1>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="product in products" :key="product.id" class="border rounded-lg p-4">
                    <NuxtLink :to="`/product/${product.id}`">
                        <!-- Add a placeholder for the product image -->
                        <div class="w-full h-48 bg-gray-200 mb-4"></div>
                        <h2 class="text-lg font-semibold">{{ product.title }}</h2>
                        <p class="text-gray-700">${{ product.price }}</p>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';
import type { Product } from '~/types';

const products = ref<Product[]>([])

const fetchProducts = async () => {
    try {
        const { data } = await useFetch<Product[]>('/api/posts')
        products.value = data.value
    } catch (error) {
        console.error(error)
    }
}

onMounted(fetchProducts)
</script>
