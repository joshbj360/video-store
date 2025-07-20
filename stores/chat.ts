import { defineStore } from 'pinia'
import type { Chat, Message, Profile } from '~/types'
import { useUserStore } from './user'

export const useChatStore = defineStore('chat', {
    state: () => ({
        chats: [] as Chat[],
        activeChat: null as Chat | null,
        messages: [] as Message[],
    }),
    actions: {
        async createChat(participants: Profile[]) {
            const { data } = await useFetch<Chat>('/api/chat', {
                method: 'POST',
                body: {
                    participants: participants.map(p => p.id)
                }
            })
            this.chats.push(data.value)
            this.activeChat = data.value
        },
        async sendMessage(text: string) {
            const userStore = useUserStore()
            if (this.activeChat) {
                const { data } = await useFetch<Message>(`/api/chat/${this.activeChat.id}/message`, {
                    method: 'POST',
                    body: {
                        senderId: userStore.id,
                        text,
                    }
                })
                this.messages.push(data.value)
            }
        },
        subscribeToMessages() {
            const { $supabase } = useNuxtApp()
            if (this.activeChat) {
                $supabase
                    .channel(`chat:${this.activeChat.id}`)
                    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Message' }, (payload) => {
                        this.messages.push(payload.new as Message)
                    })
                    .subscribe()
            }
        }
    }
})
