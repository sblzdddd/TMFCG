<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useChat } from '~/composables/useChat'
import { useUser } from '~/composables/useUser'
import { waitForConnection } from '~/composables/useSocket'
import { getMemberAvatarUrl } from '~/composables/useUser'

const { sendChat, getChatHistory, messages } = useChat()
const { user } = useUser()

const inputMessage = ref('')

const onSendChat = () => {
    if(inputMessage.value.trim() === '') return
    sendChat(inputMessage.value)
    inputMessage.value = ''
}

onMounted(async () => {
    await waitForConnection()
    await getChatHistory()
})

const isMyMessage = (message: ChatMessage) => {
    return user.value.id === message.sender.id
}
</script>

<template>
    <h2 class="title-with-dots">聊天</h2>
    <div class="chat-list">
        <div v-for="message in messages" :key="message.message" class="chat-message" :class="isMyMessage(message)?'flex-row-reverse':''">
            <img :src="getMemberAvatarUrl(message.sender.avatar)" class="w-9 h-9 rounded-lg mt-0.5" alt="avatar">
            <div class="flex flex-col max-w-[70%]" :class="isMyMessage(message)?'items-end':'items-start'">
                <div class="message-info flex flex-row items-end w-full gap-2" :class="isMyMessage(message)?'justify-between':''">
                    <span class="sender">{{ !isMyMessage(message)?message.sender.name:'' }}</span>
                    <span class="message-time">{{ new Date(message.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) }}</span>
                </div>
                <span class="message">{{ message.message }}</span>
            </div>
        </div>
    </div>
        
    <div class="flex flex-row gap-3 w-full">
        <v-text-field v-model="inputMessage" variant="outlined" density="compact" label="发送消息" hide-details @keyup.enter="onSendChat" />
        <v-btn @click="onSendChat">发送</v-btn>
    </div>
</template>
<style lang="postcss">
.chat-list {
    @apply !bg-transparent flex-1 overflow-auto;

    /* Add custom scrollbar styling */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #4f2c1e50;
        border-radius: 4px;
    }
}
.chat-message {
    @apply flex flex-row gap-3 items-start mb-4;
}
.chat-list .v-list-item {
    @apply !px-0;
}
.chat-list .v-list-item__spacer {
    @apply !w-5;
}
.message-time {
    @apply text-[0.6rem] h-4;
    font-weight: 400;
    letter-spacing: 0.0178571429em;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    opacity: var(--v-list-item-subtitle-opacity, var(--v-medium-emphasis-opacity));
    overflow: hidden;
    padding: 0;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    word-break: initial;
}
.message, .sender {
    @apply p-0 text-sm font-normal tracking-[0.009375em] leading-none normal-case;
    @apply overflow-hidden break-all whitespace-normal 
    hyphens-auto [-webkit-hyphens:auto];
    display: -webkit-box;
}
.sender {
    @apply font-medium text-base;
}
.message {
    @apply !text-justify;
}
</style>
