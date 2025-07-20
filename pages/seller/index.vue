<template>
    <MainLayout>
        <div class="pt-[80px] w-[calc(100%-90px)] max-w-[690px]">
            <h1 class="text-2xl font-bold mb-4">Seller Dashboard</h1>

            <div class="mb-8">
                <h2 class="text-xl font-semibold mb-2">Create a new product</h2>
                <form @submit.prevent="createProduct">
                    <div class="mb-4">
                        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <TextInput id="title" v-model:input="newProduct.title" placeholder="Product title" />
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea id="description" v-model="newProduct.description" placeholder="Product description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="price" class="block text-gray-700 text-sm font-bold mb-2">Price</label>
                        <TextInput id="price" v-model:input="newProduct.price" placeholder="Product price" inputType="number" />
                    </div>
                    <div class="mb-4">
                        <label for="stock" class="block text-gray-700 text-sm font-bold mb-2">Stock</label>
                        <TextInput id="stock" v-model:input="newProduct.stock" placeholder="Product stock" inputType="number" />
                    </div>
                    <div class="mb-4">
                        <label for="video" class="block text-gray-700 text-sm font-bold mb-2">Product Video</label>
                        <input type="file" @change="handleFileUpload" />
                    </div>
                    <button type="submit" class="bg-[#F02C56] text-white font-bold py-2 px-4 rounded">Create Product</button>
                </form>
            </div>

            <div>
                <h2 class="text-xl font-semibold mb-2">Your Products</h2>
                <table class="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b">Title</th>
                            <th class="py-2 px-4 border-b">Price</th>
                            <th class="py-2 px-4 border-b">Stock</th>
                            <th class="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td class="py-2 px-4 border-b">{{ product.title }}</td>
                            <td class="py-2 px-4 border-b">{{ product.price }}</td>
                            <td class="py-2 px-4 border-b">{{ product.stock }}</td>
                            <td class="py-2 px-4 border-b">
                                <button class="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                                <button class="text-red-500 hover:text-red-700">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';
import type { Product } from '~/types';

const userStore = useUserStore()

const newProduct = ref<Product>({
    title: '',
    description: '',
    price: 0,
    stock: 0,
    video: '',
})

const products = ref<Product[]>([])

const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
        const { upload } = useCloudinary()
        const { public_id } = await upload(file)
        newProduct.value.media = [{ url: public_id, type: 'VIDEO' }]
    }
}

const fetchProducts = async () => {
    try {
        const { data } = await useFetch<Product[]>(`/api/seller/products?userId=${userStore.id}`)
        products.value = data.value
    } catch (error) {
        console.error(error)
    }
}

const createProduct = async () => {
    try {
        await userStore.createPost({
            ...newProduct.value,
            slug: newProduct.value.title.toLowerCase().replace(/ /g, '-'),
            sellerId: userStore.id,
            store_name: userStore.name,
        })
        // Reset the form
        newProduct.value = {
            title: '',
            description: '',
            price: 0,
            stock: 0,
            video: '',
        }
        await fetchProducts()
    } catch (error) {
        console.error(error)
    }
}

onMounted(fetchProducts)
</script>
