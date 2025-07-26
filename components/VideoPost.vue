<template>
  <div class="w-full">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <img :src="post.seller.avatar ?? ''" class="rounded-full w-10 h-10" />
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
      <ClientOnly>
        <video ref="videoRef" id="cloudinary-video" controls muted playsinline class="cld-video-player cld-fluid"></video>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Product } from '~/types';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
const props = defineProps<{ post: Product }>();
const { public: { cloudinaryCloudName } } = useRuntimeConfig();
const { $initCloudinaryPlayer } = useNuxtApp();

const videoRef = ref<HTMLVideoElement | null>(null);
const isFollowing = computed(() => false);

const followUser = () => userStore.followUser(props.post.seller);
const unfollowUser = () => userStore.unfollowUser(props.post.seller);

onMounted(async () => {
  if (!videoRef.value || !props.post.media[0]?.url) return;

  try {
    await $initCloudinaryPlayer('cloudinary-video', {
      cloudName: cloudinaryCloudName,
      publicId: props.post.media[0].url,
      productId: props.post.id,
      productName: props.post.description,
    });
  } catch (error) {
    console.error('Failed to initialize Cloudinary player:', error);
  }
});
</script>