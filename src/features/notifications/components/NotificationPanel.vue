<template>
  <div class="alarm-panel flex-column">
    <CardComponent
      v-for="(notification, index) in notifications"
      :key="index"
      :class="{ unread: !notification.isRead }"
      class="notification-card"
    >
      <div class="d-flex justify-content-between align-items-center">
        <div class="notification-content">
          <p class="text-white mb-0">
            <span
              :class="getTypeClass(notification.message)"
              class="notification-badge"
            >
              {{ getType(notification.message) }}
            </span>
            <span class="message-text">{{
              getMessage(notification.message)
            }}</span>
          </p>
        </div>
        <p class="text-secondary mb-0 timestamp">
          {{ notification.timestamp }}
        </p>
      </div>
    </CardComponent>
  </div>
</template>

<script lang="ts" setup>
import CardComponent from "@/components/molecules/CardComponent.vue";

interface Notification {
  message: string;
  timestamp: string;
  isRead: boolean;
}

const notifications: Notification[] = [
  {
    message: "[Critical] 데이터베이스 서버 연결이 끊겼습니다.",
    timestamp: "2024-11-26 17:30",
    isRead: false,
  },
  {
    message: "[Warning] 메모리 사용량이 71%에 도달했습니다.",
    timestamp: "2024-11-26 16:15",
    isRead: false,
  },
  {
    message: "[Error] Jenkins 빌드 실패: frontend-pipeline #128",
    timestamp: "2024-11-26 15:23",
    isRead: false,
  },
  {
    message: "[Info] web-nginx 컨테이너가 실행되었습니다.",
    timestamp: "2024-11-26 14:42",
    isRead: true,
  },
  {
    message: "[Debug] 캐시 데이터 자동 정리가 완료되었습니다.",
    timestamp: "2024-11-26 13:05",
    isRead: true,
  },
  {
    message: "[Info] backend 서버에 git 상태 조회 기능이 추가되었습니다.",
    timestamp: "2024-11-26 10:58",
    isRead: true,
  },
  {
    message: "[Warning] CPU 사용량이 85%를 초과했습니다.",
    timestamp: "2024-11-26 09:45",
    isRead: true,
  },
  {
    message: "[Info] 시스템 정기 백업이 완료되었습니다.",
    timestamp: "2024-11-26 04:00",
    isRead: true,
  },
  {
    message: "[Error] API 서버 응답 시간이 임계값을 초과했습니다.",
    timestamp: "2024-11-25 23:17",
    isRead: true,
  },
  {
    message: "[Info] 보안 업데이트가 설치되었습니다.",
    timestamp: "2024-11-25 22:30",
    isRead: true,
  },
];

const getType = (message: string): string => {
  const match = message.match(/^\[(.*?)\]/);
  return match ? match[0] : "";
};

const getMessage = (message: string): string => {
  return message.replace(/^\[(.*?)\]\s*/, "");
};

const getTypeClass = (message: string): string => {
  const type = getType(message).toLowerCase();
  const typeMap: { [key: string]: string } = {
    "[info]": "text-info",
    "[warning]": "text-warning",
    "[error]": "text-error",
    "[critical]": "text-critical",
    "[debug]": "text-debug",
  };
  return typeMap[type] || "";
};
</script>

<style lang="scss" scoped>
.alarm-panel {
  height: 100%;
  gap: 0.5rem;
  padding: 0.5rem;
}

.notification-card {
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
  margin: 0 0.8rem;
  max-width: calc(100% - 1.6rem);

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    transform: translateX(-2px);
  }
}

.unread {
  border-right: 4px solid #34c759 !important;
  background-color: rgba(52, 199, 89, 0.05);
}

.notification-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-right: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
}

.message-text {
  font-size: 0.95rem;
}

.timestamp {
  font-size: 0.85rem;
  opacity: 0.8;
  min-width: 110px;
  text-align: right;
}

.notification-content {
  flex: 1;
  margin-right: 1rem;
}

.text-critical {
  color: #ff3b30;
  background-color: rgba(255, 59, 48, 0.1);
}

.text-warning {
  color: #ffcc00;
  background-color: rgba(255, 204, 0, 0.1);
}

.text-info {
  color: #34c759;
  background-color: rgba(52, 199, 89, 0.1);
}

.text-debug {
  color: #6c757d;
  background-color: rgba(108, 117, 125, 0.1);
}

.text-error {
  color: #ff8000;
  background-color: rgba(255, 128, 0, 0.1);
}
</style>
