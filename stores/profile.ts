import { defineStore } from 'pinia'


export const useProfileStore = defineStore('profile', {
  state: () => ({
    id: '',
    name: '',
    bio: '',
    image: '',
    post: null,
    posts: null,
    allLikes: 0,
  }),
  actions: {
    async getProfile(id) {
      this.resetUser()
      let {data} = await useFetch(`/api/profiles/${id}`)

      const profileData = data.value as {
        id: string,
        user: Array<{ name: string, bio: string, image: string }>,
        posts: any[]
      }

      this.$state.id = profileData.id
      this.$state.name = profileData.user[0].name
      this.$state.bio = profileData.user[0].bio
      this.$state.image = profileData.user[0].image

      this.$state.posts = profileData.posts

      this.allLikesCount()
    },

    allLikesCount() {
        this.allLikes = 0
        for (let i = 0; i < this.posts.length; i++) {
            const post = this.posts[i];
             for (let j = 0; j < post.likes.length; j++) {
                this.allLikes++
             }
        }
    },

    resetUser() {      
        this.$state.id = ''
        this.$state.name = ''
        this.$state.bio = ''
        this.$state.image = ''
        this.$state.posts = ''
      }
  },
  persist: true,
})
