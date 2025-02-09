<template>
  <div
    class="main bg-light d-flex align-items-center justify-content-center p-4"
  >
    <div class="main__box w-100 mw-100 d-flex flex-column align-items-center">
      <!-- 로고 영역 -->
      <div class="text-center mb-4">
        <h1 class="fs-1 fw-bold text-dark">HYUNDAI AUTOEVER</h1>
        <p class="text-secondary mt-2">
          디지털 혁신을 선도하는 글로벌 IT 서비스 기업
        </p>
      </div>

      <!-- 로그인 카드 -->
      <div class="bg-white rounded shadow p-4">
        <h2 class="fs-4 fw-semibold text-center mb-4">로그인</h2>

        <!-- 로그인 폼 -->
        <form
          class="main__box__form d-flex flex-column gap-3"
          @submit.prevent="handleLogin"
        >
          <div class="d-flex flex-column gap-2">
            <!-- 아이디 입력 -->
            <div class="position-relative">
              <UserIcon
                class="position-absolute start-0 top-50 translate-middle-y ms-3"
              />
              <input
                v-model="credentials.id"
                type="text"
                placeholder="아이디"
                class="form-control ps-5"
                required
              />
            </div>

            <!-- 비밀번호 입력 -->
            <div class="position-relative">
              <LockIcon
                class="position-absolute start-0 top-50 translate-middle-y ms-3"
              />
              <input
                v-model="credentials.password"
                type="password"
                placeholder="비밀번호"
                class="form-control ps-5"
                required
              />
            </div>
          </div>

          <!-- 에러 메시지 -->
          <div v-if="userStore.error" class="text-danger small">
            {{ userStore.error }}
          </div>

          <!-- 추가 옵션 -->
          <div class="d-flex justify-content-between align-items-center small">
            <label class="d-flex align-items-center gap-2">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="rememberMe"
              />
              <span class="text-secondary">아이디 저장</span>
            </label>
          </div>

          <!-- 로그인 버튼 -->
          <button
            type="submit"
            class="w-100 d-flex btn btn-primary justify-content-center"
            :disabled="userStore.isLoading"
          >
            {{ userStore.isLoading ? "로그인 중..." : "로그인" }}
          </button>
        </form>
      </div>

      <!-- 푸터 -->
      <div class="text-center small text-secondary mt-4">
        <p class="mb-0">Copyright © HYUNDAI AUTOEVER. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@features/auth/stores/auth";
import { useRouter } from "vue-router";
import { UserIcon, LockIcon } from "lucide-vue-next";

const userStore = useUserStore();
const router = useRouter();

const credentials = ref({
  id: "",
  password: "",
});

const rememberMe = ref(false);

onMounted(() => {
  const savedId = localStorage.getItem("rememberedId");
  if (savedId) {
    credentials.value.id = savedId;
    rememberMe.value = true;
  }
});

const handleLogin = async () => {
  if (rememberMe.value) {
    localStorage.setItem("rememberedId", credentials.value.id);
  } else {
    localStorage.removeItem("rememberedId");
  }

  const success = await userStore.login(credentials.value);
  if (success) {
    router.push({ name: "dashboard" });
  }
};
</script>

<style lang="scss" scoped>
.main {
  min-width: 100vh;
  min-height: 100vh;
  &__box {
    max-width: 28rem;
  }
}
</style>
