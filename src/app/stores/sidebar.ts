import { defineStore } from 'pinia';

interface SidebarState {
  isCollapsed: boolean;
}

export const useSidebarStore = defineStore('sidebar', {
  state: (): SidebarState => ({
    isCollapsed: false,
  }),
  
  actions: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
}); 