import { defineNuxtPlugin } from '#app';
import type { Product } from '~/types';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      initCloudinaryPlayer: async (videoElementId: string, post: Product) => {
        const { default: cloudinaryVideoPlayer } = await import('cloudinary-video-player');
        await import('cloudinary-video-player/cld-video-player.min.css');
        const { Cloudinary } = await import('cloudinary-core');

        const cld = new Cloudinary({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME });

        const player = cloudinaryVideoPlayer.videoPlayer(videoElementId, {
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          shoppable: {
            startState: 'openOnPlay',
            autoClose: 3,
            showPostPlayOverlay: true,
            bannerMsg: 'SHOP PRODUCTS',
            width: '25%',
            transformation: { crop: 'pad', aspect_ratio: '1:1' },
            products: [
              {
                productId: post.id,
                productName: post.description,
                publicId: 'Samba_OG_Shoes_Black_IG9031_01_standard_uxrmkz',
                startTime: 0,
                endTime: 5,
                hotspots: [],
              },
            ],
          },
        });

        player.source(post.media[0].url);
        return player;
      },
    },
  };
});