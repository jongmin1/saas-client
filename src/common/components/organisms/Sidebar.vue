<template>
  <div>
    <div class="sidebar-logo my-3 ms-1 mb-4">
      <a href="#">
        <img src="@common/assets/images/back_rm.png" class="avatar" alt="" />
      </a>
    </div>
    <ul class="sidebar-nav">
      <li v-for="(item, index) in sidebarItems" :key="index" class="my-1">
        <a
          href="#"
          class="sidebar-link d-flex align-items-center justify-content-center"
          @click.prevent="item.onClick && item.onClick()"
        >
          <i :class="`fa-solid ${item.icon} custom-icon`" />
          <span v-if="item.notificationCount" class="badge">{{
            item.notificationCount
          }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useSidebarStore } from "@common/stores/sidebar";
import { ref } from "vue";
import { useRouter } from "vue-router";

const sidebarStore = useSidebarStore();
const router = useRouter();

const sidebarItems = ref([
  { icon: "fa-magnifying-glass", onClick: sidebarStore.toggleSidebar },
  { icon: "fa-bell", notificationCount: 3, onClick: toAlarm },
  { icon: "fa-solid fa-industry", onClick: toTemp },
  { icon: "fa-border-all" },
  { icon: "fa-plus" },
]);

function toTemp() {
  router.push({ name: "Operations" });
}

function toAlarm() {
  router.push({ name: "Notification" });
}
</script>

<style lang="scss" scoped>
.sidebar-logo img {
  width: 45px;
  height: 100%;
  object-fit: contain;
  overflow: visible;
}

.sidebar-logo {
  color: #e9ecef;
  font-size: 1.15rem;
  font-weight: 600;
  overflow: visible;
}

.sidebar-nav {
  list-style: none;
  margin-bottom: 0;
  padding-left: 0;
  margin-left: 0;
}

a.sidebar-link {
  position: relative;
  padding: 0.625rem 1.025rem;
  color: #e9ecef;
  position: relative;
  display: block;
  font-size: 0.875rem;
  text-decoration: none;
}

.custom-icon {
  display: inline-block;
  font-size: 1.1rem;
}

.badge {
  position: absolute;
  top: 15;
  right: 21%;
  transform: translate(50%, -50%);
  background-color: #ff4d4f;
  color: white;
  border-radius: 50%;
  padding: 0.15rem 0.3rem;
}
</style>
