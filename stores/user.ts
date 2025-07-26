import { defineStore } from 'pinia'
import { useGeneralStore } from './general'
import type { Profile, Product, Like, Review } from '~/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    email: '',
    role: '',
    avatar: '',
    username: '',
    // Add other properties required by Profile here, with default values
    // For example:
    // createdAt: '',
    // updatedAt: '',
    // followers: [],
    // following: [],
    // etc.
  }),
  actions: {
    async login({ email, password }: { email: string; password: string }) {
      const supabase = useSupabaseClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    },

    async register({ email, password, ...metadata }: { email: string; password: string; [key: string]: any }) {
      const supabase = useSupabaseClient()
      const { data, error } = await supabase.auth.signUp({
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
      const supabase = useSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        this.$state.id = user.id
        this.$state.username = user.user_metadata.username || ''
      }
    },

    async updateUserImage(data: { image: string }) {
      const supabase = useSupabaseClient()
      const { data: authData, error: authError } = await supabase.auth.updateUser({
        data: { image: data.image }
      })
      if(authError) throw authError;
      return authData
    },

    async updateUser(name: string, bio: string) {
      const supabase = useSupabaseClient()
      const { data: authData, error: authError } = await supabase.auth.updateUser({
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
        const generalStore = useGeneralStore()
        if (generalStore.selectedProduct) {
            // Assign reviews directly from the product if available
            generalStore.selectedProduct.reviews = data.value?.reviews || []
        }
    },

    async likePost(post: Product) {
        const { data: likeData } = await useFetch<Like>('/api/likes', {
            method: 'POST',
            body: {
                userId: this.id,
                productId: post.id,
            }
        })

        let singleProduct = useGeneralStore().products?.find(p => p.id === post.id)
        if (likeData.value) {
            singleProduct?.likes.push(likeData.value)
        }
    },

    async unlikeProduct(product: Product) {
        let likeId: string | null = null
        product.likes.forEach(like => {
            if (like.userId === this.id) {
                likeId = String(like.id)
            }
        })
        await useFetch(`/api/likes/${likeId}`, { method: 'DELETE' })

        let singleProduct = useGeneralStore().products?.find(p => p.id === product.id)
        let index = singleProduct?.likes.findIndex(like => String(like.id) === likeId)
        if (index && index > -1) {
            singleProduct?.likes.splice(index, 1)
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
      const supabase = useSupabaseClient()
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      this.resetUser()
    },

    resetUser() {
      this.$state.id = ''
      this.$state.username = ''
      this.$state.email = ''
    }

  },
  persist: true,
})
