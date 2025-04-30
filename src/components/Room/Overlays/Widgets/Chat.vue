<script lang="ts" setup>
import {nextTick, onMounted, ref, watch} from 'vue'
import {waitForConnection} from '~/composables/useSocket'
import {getMemberAvatarUrl} from '~/composables/useUser'
import type { ChatMessage } from '~/types/chat'

const props = defineProps({
  isOverlayOpened: {
    type: Boolean,
    default: false
  }
})

const {sendChat, getChatHistory, messages} = useChat()
const {user} = useUser()

const chatList = ref<HTMLDivElement | null>(null)
const inputMessage = ref('')
const displayedMessages = ref<ChatMessage[]>([])
const animationKey = ref(0)

const scrollToBottom = () => {
  if (chatList.value) {
    chatList.value.scrollTop = chatList.value.scrollHeight
  }
}

const onSendChat = () => {
  if (inputMessage.value.trim() === '') return
  sendChat(inputMessage.value)
  inputMessage.value = ''
  nextTick(() => {
    scrollToBottom()
  })
}

onMounted(async () => {
  await waitForConnection()
  await getChatHistory()
  nextTick(() => {
    scrollToBottom()
  })
})

watch(() => messages.value, (newMessages) => {
  displayedMessages.value = newMessages
  nextTick(() => {
    scrollToBottom()
  })
})

// Watch for isOverlayOpened changes to trigger animation replay
watch(() => props.isOverlayOpened, (newValue) => {
  if (newValue) {
    chatList.value?.scrollTo({top: 0})
    // Reset messages to trigger animation replay
    displayedMessages.value = []
    animationKey.value++

    // After Vue has updated the DOM, add the messages back
    nextTick(() => {
      // Add a class to indicate this is a replay animation
      document.documentElement.classList.add('replaying-chat')
      displayedMessages.value = messages.value

      // Force scroll to bottom after animation starts
      nextTick(() => {
        scrollToBottom()
        // Remove the replay class after animations finish
        setTimeout(() => {
          document.documentElement.classList.remove('replaying-chat')
        }, displayedMessages.value.length * 20 + 250)
      })
    })
  }
})

const isMyMessage = (message: ChatMessage) => {
  return user.value.id === message.sender.id
}
</script>

<template>
  <div class="overlay-card chat-section">
    <h2 class="title-with-dots">聊天</h2>
    <div :key="animationKey" ref="chatList" class="chat-list">
      <transition-group name="popup" @after-enter="scrollToBottom">
        <div 
          v-for="(message, index) in displayedMessages"
          :key="index"
          :class="isMyMessage(message)?'flex-row-reverse':''"
          :style="`--index: ${index - displayedMessages.length + 16}`"
          class="chat-message"
        >
          <img :src="getMemberAvatarUrl(message.sender.avatar)" alt="avatar" class="w-9 h-9 rounded-lg mt-0.5">
          <div :class="isMyMessage(message)?'items-end':'items-start'" class="flex flex-col max-w-[70%]">
            <div
              :class="isMyMessage(message)?'justify-between':''"
              class="message-info flex flex-row items-end w-full gap-2"
            >
              <span class="sender">{{ !isMyMessage(message) ? message.sender.name : '' }}</span>
              <span class="message-time">{{
                  new Date(message.timestamp).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                }}</span>
            </div>
            <span class="message">{{ message.message }}</span>
          </div>
        </div>
      </transition-group>
    </div>

    <div class="flex flex-row gap-3 w-full">
      <v-text-field
        v-model="inputMessage"
        density="compact"
        hide-details
        label="发送消息"
        variant="outlined"
        @keyup.enter="onSendChat"
      />
      <v-btn @click="onSendChat">发送</v-btn>
    </div>
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

/* Popup transition animations */
.popup-enter-active,
.popup-leave-active {
  transition: all 250ms ease !important;
}

/* Only apply delay when replaying animation */
html.replaying-chat .popup-enter-active {
  transition-delay: calc(var(--index) * 0.02s) !important;
}

.popup-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.popup-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
