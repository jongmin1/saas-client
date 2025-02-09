import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSidebarStore = defineStore('sidebar', () => {
  
  /* Sidebar toggler */
  const isCollapsed = ref(true);

  function toggleSidebar() {
    isCollapsed.value = !isCollapsed.value;
    console.log("isCollapsed : " + isCollapsed.value);
  }

  /* AI Chatbot */
  const isSecondaryView = ref(false);

  function toggleSecondaryView() {
    isSecondaryView.value = !isSecondaryView.value;
    console.log("isSecondaryView : " + isSecondaryView.value);
  }

  return { isCollapsed, toggleSidebar, isSecondaryView, toggleSecondaryView };
});

