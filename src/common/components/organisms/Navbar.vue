<template>
  <nav class="navbar navbar-expand mx-3">
    <div class="container-fluid">
      <div class="navbar-collapse justify-content-end">
        <ul class="navbar-nav align-items-end">
          <li class="nav-item">
            <span class="me-2 time-container text-white align-items-end">{{
              currentTime
            }}</span>
          </li>
          <li class="nav-item">
            <span class="me-2 text-white">{{ userStore.user?.name }}</span>
          </li>
          <li class="nav-item dropdown d-flex align-items-end">
            <a data-bs-toggle="dropdown" class="nav-icon pe-md-0">
              <img
                src="../../assets/images/autoever.png"
                class="avatar img-fluid rounded"
                alt="사용자 프로필"
              />
            </a>
            <div class="dropdown-menu dropdown-menu-end">
              <a class="dropdown-item" @click="showProfile">Profile</a>
              <a class="dropdown-item" @click="showSettings">Setting</a>
              <a class="dropdown-item border-top" @click="handleLogout"
                >Logout</a
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <ProfilePopup ref="profilePopupRef" />
  <SettingsPopup ref="settingsPopupRef" />
</template>

<script setup lang="ts">
import { useUserStore } from "@features/auth/stores/auth";
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import ProfilePopup from "@/common/components/organisms/ProfilePopup.vue";
import SettingsPopup from "@/common/components/organisms/SettingsPopup.vue";

const userStore = useUserStore();
const currentTime = ref<string>("");
const profilePopupRef = ref<InstanceType<typeof ProfilePopup> | null>(null);
const settingsPopupRef = ref<InstanceType<typeof SettingsPopup> | null>(null);

function updateTime() {
  currentTime.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
}

const handleLogout = async () => {
  const { success } = await userStore.logout();
  if (!success) {
    console.error("로그아웃 실패");
  }
};

const showProfile = () => {
  profilePopupRef.value?.showPopup();
};

const showSettings = () => {
  settingsPopupRef.value?.showPopup();
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});
</script>

<style lang="scss" scoped>
.avatar {
  height: 40px;
  width: 40px;
  object-fit: cover;
  cursor: pointer;
}

.navbar {
  height: 60px;
}

.navbar-nav {
  height: 40px;
}

.navbar-expand .navbar-nav {
  margin-left: auto;
}

.dropdown-item {
  cursor: pointer;
}

.time-container {
  text-align: center;
  margin-top: 50px;
}
</style>
