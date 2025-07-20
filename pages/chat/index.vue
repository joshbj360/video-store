<template>
    <MainLayout>
        <div class="pt-[80px] w-full flex">
            <div class="w-1/4 border-r">
                <div v-for="chat in chatStore.chats" :key="chat.id" @click="setActiveChat(chat)" class="p-4 cursor-pointer hover:bg-gray-100">
                    {{ chat.participants.map(p => p.username).join(', ') }}
                </div>
            </div>
            <div class="w-3/4">
                <div v-if="chatStore.activeChat" class="h-full flex flex-col">
                    <div class="flex-1 p-4 overflow-y-auto">
                        <div v-for="message in chatStore.messages" :key="message.id" class="mb-4">
                            <div class="font-semibold">{{ message.sender.username }}</div>
                            <div>{{ message.text }}</div>
                        </div>
                    </div>
                    <div class="p-4 border-t">
                        <form @submit.prevent="sendMessage">
                            <TextInput v-model:input="newMessage" placeholder="Type a message..." />
                            <button type="submit" class="bg-[#F02C56] text-white font-bold py-2 px-4 rounded mt-2">Send</button>
                        </form>
                    </div>
                </div>
                <div v-else class="h-full flex items-center justify-center">
                    <p>Select a chat to start messaging</p>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';
import { useChatStore } from '~/stores/chat';
import type { Chat } from '~/types';

const chatStore = useChatStore()

const newMessage = ref('')

const setActiveChat = (chat: Chat) => {
    chatStore.activeChat = chat
    chatStore.subscribeToMessages()
}

const sendMessage = () => {
    if (newMessage.value) {
        chatStore.sendMessage(newMessage.value)
        newMessage.value = ''
    }
}
</script>
