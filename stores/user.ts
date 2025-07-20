import { defineStore } from 'pinia'
import { useGeneralStore } from './general'
import type { Profile, Product, Like, Review } from '~/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    bio: '',
    image: ''
  } as Profile),
  actions: {
    async login({ email, password }) {
      const { $supabase } = useNuxtApp()
      const { data, error } = await $supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    },

    async register({ email, password, ...metadata }) {
        const { $supabase } = useNuxtApp()
      const { data, error } = await $supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...metadata,
          }
        }
      })
      if (error) throw error
      return data
    },

    async getUser() {
      const { $supabase } = useNuxtApp()
      const { data: { user } } = await $supabase.auth.getUser()
      if (user) {
        this.$state.id = user.id
        this.$state.name = user.user_metadata.name
        this.$state.bio = user.user_metadata.bio
        this.$state.image = user.user_metadata.image
      }
    },

    async updateUserImage(data: { image: string }) {
      const { $supabase } = useNuxtApp()
      const { data: authData, error: authError } = await $supabase.auth.updateUser({
        data: { image: data.image }
      })
      if(authError) throw authError;
      return authData
    },

    async updateUser(name: string, bio: string) {
      const { $supabase } = useNuxtApp()
      const { data: authData, error: authError } = await $supabase.auth.updateUser({
        data: { name, bio }
      })
       if(authError) throw authError;
      return authData
    },

    async createPost(data: Product) {
        const { data: postData } = await useFetch<Product>('/api/posts', {
            method: 'POST',
            body: data
        })
        return postData
    },

    async deletePost(post: Product) {
        await useFetch(`/api/posts/${post.id}`, { method: 'DELETE' })
    },

    async addComment(post: Product, comment: string) {
        const { data: commentData } = await useFetch<Review>('/api/comments', {
            method: 'POST',
            body: {
                userId: this.id,
                productId: post.id,
                sellerProfileId: post.sellerId,
                rating: 5, // or whatever you want
                comment: comment,
            }
        })
        await this.updateComments(post)
        return commentData
    },

    async deleteComment(post: Product, commentId: string) {
        await useFetch(`/api/comments/${commentId}`, { method: 'DELETE' })
        await this.updateComments(post)
    },

    async updateComments(post: Product) {
        const { data } = await useFetch<Product>(`/api/posts/${post.id}`)
        useGeneralStore().selectedPost.comments = data.value.comments
    },

    async likePost(post: Product) {
        const { data: likeData } = await useFetch<Like>('/api/likes', {
            method: 'POST',
            body: {
                userId: this.id,
                productId: post.id,
            }
        })

        let singlePost = useGeneralStore().posts.find(p => p.id === post.id)
        singlePost.likes.push(likeData.value)
    },

    async unlikePost(post: Product) {
        let likeId = null
        post.likes.forEach(like => {
            if (like.userId === this.id) {
                likeId = like.id
            }
        })
        await useFetch(`/api/likes/${likeId}`, { method: 'DELETE' })

        let singlePost = useGeneralStore().posts.find(p => p.id === post.id)
        let index = singlePost.likes.findIndex(like => like.id === likeId)
        if (index > -1) {
            singlePost.likes.splice(index, 1)
        }
    },

    async followUser(userToFollow: Profile) {
        const { data } = await useFetch('/api/follow', {
            method: 'POST',
            body: {
                followerId: this.id,
                followingId: userToFollow.id,
            }
        })
    },

    async unfollowUser(userToUnfollow: Profile) {
        let followId = null
        // You'll need to fetch the follow relationship first
        // to get the ID of the follow record.
        // This is a placeholder.
        await useFetch(`/api/follow/${followId}`, { method: 'DELETE' })
    },

    async logout() {
      const { $supabase } = useNuxtApp()
      const { error } = await $supabase.auth.signOut()
      if (error) throw error
      this.resetUser()
    },

    resetUser() {
      this.$state.id = ''
      this.$state.name = ''
      this.$state.email = ''
      this.$state.bio = ''
      this.$state.image = ''
    }

  },
  persist: true,
})
