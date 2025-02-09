<template>
  <Transition name="fade">
    <div v-if="isPopupVisible" class="popup-overlay" @click.self="closePopup">
      <div class="popup-content">
        <header class="popup-header d-flex justify-content-between">
          <h5 class="m-0">프로필</h5>
          <button class="close-btn" @click="closePopup" aria-label="닫기">
            ×
          </button>
        </header>

        <main class="popup-body">
          <div class="profile-info">
            <ProfileInfoRow
              v-for="(value, key) in userInfo"
              :key="key"
              :label="key"
              :value="value"
            />
          </div>
        </main>

        <footer class="popup-footer">
          <button class="btn btn-secondary" @click="closePopup">닫기</button>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ProfileInfoRow from "./ProfileInfoRow.vue";

interface UserInfo {
  이름: string;
  부서명: string;
  직책: string;
  입사일: string;
  연락처: string;
  이메일: string;
}

const isPopupVisible = ref(false);
const userInfo: UserInfo = {
  이름: "admin",
  부서명: "공정기술팀",
  직책: "사원",
  입사일: "2024.08.26",
  연락처: "010-1234-5678",
  이메일: "admin@example.com",
};

const showPopup = () => (isPopupVisible.value = true);
const closePopup = () => (isPopupVisible.value = false);

defineExpose({
  showPopup,
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.popup-header {
  margin-bottom: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  color: #666;
}

.popup-body {
  margin-bottom: 1.5rem;
}

.popup-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
