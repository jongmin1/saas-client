import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref({
    darkMode: true,
    time24h: true,
    notifications: true
  });

  const updateSettings = (newSettings: Partial<typeof settings.value>) => {
    settings.value = {
      ...settings.value,
      ...newSettings
    };
    // 설정을 localStorage에 저장
    localStorage.setItem('userSettings', JSON.stringify(settings.value));
  };

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      settings.value = JSON.parse(savedSettings);
    }
  };

  return {
    settings,
    updateSettings,
    loadSettings
  };
}); 