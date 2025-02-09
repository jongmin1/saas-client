<template>
  <Transition name="fade">
    <div v-if="isVisible" class="popup-overlay" @click.self="closePopup">
      <div class="popup-content">
        <header class="popup-header d-flex justify-content-between">
          <h5 class="m-0">설정</h5>
          <button class="close-btn" @click="closePopup" aria-label="닫기">
            ×
          </button>
        </header>

        <main class="popup-body">
          <div class="settings-container">
            <div class="settings-section">
              <h6>화면 설정</h6>
              <div class="setting-item">
                <span>다크 모드</span>
                <toggle-switch
                  v-model="settingsStore.settings.darkMode"
                  @update:modelValue="(value: boolean) => 
                      settingsStore.updateSettings({ darkMode: value })"
                />
              </div>
            </div>

            <!-- 시간 설정 -->
            <div class="settings-section">
              <h6>시간 설정</h6>
              <div class="setting-item">
                <span>24시간 형식</span>
                <toggle-switch
                  v-model="settingsStore.settings.time24h"
                  @update:modelValue="(value: boolean) => 
                      settingsStore.updateSettings({ time24h: value })"
                />
              </div>
            </div>

            <!-- 알림 설정 -->
            <div class="settings-section">
              <h6>알림 설정</h6>
              <div class="setting-item">
                <span>시스템 알림</span>
                <toggle-switch
                  v-model="settingsStore.settings.notifications"
                  @update:modelValue="(value: boolean) => 
                      settingsStore.updateSettings({ notifications: value })"
                />
              </div>
            </div>
          </div>
        </main>

        <footer class="popup-footer">
          <button class="btn btn-secondary me-2" @click="closePopup">
            취소
          </button>
          <button class="btn btn-primary" @click="saveSettings">저장</button>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSettingsStore } from "@features/auth/stores/settings";
import ToggleSwitch from "@shared/components/molecules/ToggleSwitch.vue";

const settingsStore = useSettingsStore();
const isVisible = ref(false);

const showPopup = () => {
  isVisible.value = true;
};

const closePopup = () => {
  isVisible.value = false;
};

const saveSettings = () => {
  closePopup();
};

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

.settings-container {
  .settings-section {
    margin-bottom: 1.5rem;

    h6 {
      margin-bottom: 1rem;
      color: #333;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.8rem;
      padding: 0.5rem 0;

      span {
        color: #666;
      }
    }
  }
}

.popup-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  color: #666;
}
</style>
