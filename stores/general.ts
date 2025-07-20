import { defineStore } from 'pinia'
import { useUserStore } from './user'
import type { Product, Profile } from '~/types'

export const useGeneralStore = defineStore('general', {
  state: () => ({
    isLoginOpen: false,
    isEditProfileOpen: false,
    selectedPost: null as Product | null,
    ids: null,
    isBackUrl: "/",
    posts: null as Product[] | null,
    suggested: null as Profile[] | null,
    following: null as Profile[] | null,
  }),
  actions: {
    bodySwitch(val: boolean) {
      if (val) {
        document.body.style.overflow = 'hidden'
        return
      }
      document.body.style.overflow = 'visible'
    },

    allLowerCaseNoCaps(str: string) {
      return str.split(' ').join('').toLowerCase()
    },

    setBackUrl(url: string) {
        this.isBackUrl = url
    },

    async getPostById(id: string) {
        const { data } = await useFetch<Product>(`/api/posts/${id}`)
        this.$state.selectedPost = data.value
    },

    async getRandomUsers(type: string) {
        const { $supabase } = useNuxtApp()
        const { data, error } = await $supabase.from('profiles').select().limit(5)
        if (error) throw error
        if (type === 'suggested') {
            this.suggested = data as Profile[]
        }

        if (type === 'following') {
            // You'll need to implement a following feature first
            this.following = data as Profile[]
        }
    },

    updateSideMenuImage(array: Profile[], user: Profile) {
      for (let i = 0; i < array.length; i++) {
        const res = array[i];
        if (res.id == user.id) {
            res.image = user.image
        }
      }
    },

    async getAllUsersAndPosts() {
        const { data } = await useFetch<Product[]>('/api/posts')
        this.posts = data.value
    }
  },
  persist: true,
})