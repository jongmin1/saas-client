<template>
  <Transition name="fade">
    <div v-if="isPopupVisible" class="popup-overlay" @click.self="closePopup">
      <div class="popup-content">
        <header class="popup-header d-flex justify-content-between">
          <h5 class="m-0">Profile</h5>
          <button class="close-btn" @click="closePopup" aria-label="닫기">
            ×
          </button>
        </header>

        <main class="popup-body">
          <div class="profile-info">
            <div class="profile-image">
              <img
                src="@common/assets/images/autoever.png"
                alt="프로필 이미지"
                class="rounded-circle mb-5"
                width="100"
                height="100"
              />
            </div>

            <div class="user-details">
              <ProfileInfoRow
                v-for="(value, key) in userInfo"
                :key="key"
                :label="key"
                :value="value"
              />
            </div>
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
import ProfileInfoRow from "@common/components/molecules/user/ProfileInfoRow.vue";

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

// showPopup 메서드를 외부에서 접근 가능하도록 노출
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

.popup {
  &-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
    z-index: 1000;
  }

  &-content {
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
    min-width: 400px;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  &-header {
    margin-bottom: 1rem;
  }

  &-body {
    margin-bottom: 1rem;
  }

  &-footer {
    text-align: right;
  }
}

.close-btn {
  border: none;
  background: none;
  font-size: 1.5rem;
  color: #6c757d;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #343a40;
  }
}

.profile {
  &-info {
    padding: 1rem;
  }

  &-image {
    text-align: center;
  }
}
</style>
