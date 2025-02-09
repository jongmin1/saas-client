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
import ToggleSwitch from "@common/components/molecules/ToggleSwitch.vue";
import { useSettingsStore } from "@common/stores/settings";

const settingsStore = useSettingsStore();
const isVisible = ref(false);

const showPopup = () => {
  isVisible.value = true;
};

const closePopup = () => {
  isVisible.value = false;
};

const saveSettings = () => {
  settingsStore.updateSettings(settingsStore.settings);
  closePopup();
};

defineExpose({ showPopup, closePopup });
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
    cursor: pointer;
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

.settings {
  &-container {
    padding: 1rem;
  }

  &-section {
    margin-bottom: 1.5rem;

    h6 {
      //   margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #eee;
    }
  }
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  //   margin-bottom: 0.8rem;
  padding: 0.5rem 0;
}
</style>
