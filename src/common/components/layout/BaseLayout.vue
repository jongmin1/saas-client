<template>
  <div class="page">
    <div class="page__sidebar d-flex">
      <Sidebar />
    </div>
    <div class="page__main d-flex flex-column">
      <section class="page__main__navbar">
        <Navbar />
      </section>

      <div class="page__main__notice d-flex ml-2">
        <section class="page__main__notice--content col">
          <slot name="content" />
        </section>
      </div>
    </div>

    <!-- 채팅 토글 버튼 및 팝업 -->
    <div class="chat-wrapper">
      <button
        class="chat-toggle-btn"
        :class="{ active: isChatOpen }"
        @click="toggleChat"
      >
        <i class="fa-solid fa-message" />
      </button>

      <div v-show="isChatOpen" class="chat-popup">
        <Chatbot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "@common/components/organisms/Sidebar.vue";
import Navbar from "@common/components/organisms/Navbar.vue";
import Chatbot from "@common/components/chatbot/views/Chatbot.vue";

const isChatOpen = ref(false);

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};
</script>

<style scoped lang="scss">
// 페이지 레이아웃
.page {
  align-items: stretch;
  display: flex;
  width: 100%;
  min-height: 100vh;

  &__sidebar {
    max-width: 48px;
    min-width: 48px;
    background: var(--bs-dark);
  }

  &__main {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: var(--bs-dark);

    &__notice {
      height: 100%;

      &--content {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: all 0.35s ease-in-out;
        width: 100%;
        margin: 0;
        padding: 0;
      }
    }
  }
}

// 채팅 토글 버튼 및 팝업
.chat-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chat-toggle-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--bs-primary);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &.active {
    background: var(--bs-secondary);
  }
}

.chat-popup {
  position: absolute;
  bottom: 8vh;
  right: 0;
  width: 30vw;
  height: 80vh;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
