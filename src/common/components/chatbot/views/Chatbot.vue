<template>
  <div class="chatbot me-3 mb-3 bg-white rounded">
    <div class="chatbot__messages-layout d-flex align-items-center rounded">
      <div
        v-if="messages.length === 0"
        class="text-center text-2xl font-semibold"
      >
        <h4 class="">무엇을 도와드릴까요?</h4>
        <div class="temp">
          <ul class="temtemp d-flex gap-3 p-0 m-0">
            <li class="btn btn-secondary no-wrap">#주요 알람</li>
            <li class="btn btn-secondary no-wrap" @click="handleAlarmSummary">
              #요약
            </li>
            <li class="btn btn-secondary no-wrap">#CPU 사용 내역</li>
          </ul>
        </div>
      </div>
      <div
        v-for="message in messages"
        :key="message.id"
        class="chatbot__message"
      >
        <div :class="`chatbot__message chatbot__message--${message.sender}`">
          <div
            :class="`chatbot__message-bubble chatbot__message-bubble--${message.sender}`"
          >
            {{ message.text }}
          </div>
        </div>
      </div>
    </div>
    <div class="chatbot__input--container d-flex">
      <input
        v-model="message"
        class="chatbot__input--message rounded border-0 bg-transparent"
        placeholder="메시지를 입력하세요."
        :disabled="loading"
        @keyup.enter="handleSendMessage"
      />
      <button
        class="chatbot__input--send-btn cursor-pointer border-0 bg-transparent"
        :disabled="loading"
      >
        <i
          class="fa-brands fa-telegram send-btn align-items-center"
          @click="handleSendMessage"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatService } from "@common/components/chatbot/stores/chat";
import { useAlarmStore } from "@features/main/components/alarm/stores/alarm";
import { computed } from "vue";

const chatService = new ChatService();
const alarmStore = useAlarmStore();

const message = computed({
  get: () => chatService.getMessage().value,
  set: (value: string) => chatService.setMessage(value),
});

const loading = computed(() => chatService.getLoading().value);
const messages = computed(() => chatService.getMessages().value);

const handleSendMessage = () => chatService.sendMessage();

const handleAlarmSummary = async () => {
  chatService.sendAlarmSummaryRequest(alarmStore.alarmArr);
};
</script>

<style lang="scss" scoped>
.chatbot {
  display: flex;
  width: 100%;
  min-height: 100%;
  max-height: 100%;
  flex-direction: column;

  &__messages-layout {
    // width: 100%;
    // height: 90%;
    overflow-y: auto;
    margin-bottom: 0.1em;
    padding: 1vh 1vw;
    border: 0.2vh solid #ccc;
    border-radius: 1vh;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
  }

  &__message {
    width: 100%;
    display: flex;

    &--user {
      justify-content: flex-end;
    }

    &--ai {
      justify-content: flex-start;
    }
  }

  &__message-bubble {
    display: inline-block;
    max-width: 70%;
    padding: 1.5vh 1vw;
    margin: 0.3vh 0;
    border-radius: 1.5vh;
    line-height: 1.5;
    overflow: hidden;
    word-wrap: break-word;
    white-space: pre-wrap;

    &--user {
      background-color: #0084ff;
      color: white;
      border-radius: 1.5vh 1.5vh 0 1.5vh;
      text-align: right;
    }

    &--ai {
      background-color: #e5e5ea;
      color: black;
      border-radius: 1.5vh 1.5vh 1.5vh 0;
      text-align: left;
    }
  }

  &__input--message {
    // width: 100%;
    flex-grow: 1;
    padding: 2vh 1vw;
  }

  &__input--container {
    align-items: center;
    border: 0.2vh solid #ccc;
    border-radius: 1vh;
  }

  &__input--send-btn {
    font-size: 3em;
  }
}

.no-wrap {
  white-space: nowrap;
}
</style>
