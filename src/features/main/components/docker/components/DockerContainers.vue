<template>
  <div class="container-status">
    <div
      v-for="container in containers"
      :key="container.name"
      class="status-card"
    >
      <div class="status-header">
        <div class="status-name">
          <span :class="['status-icon', container.status]">
            <i
              class="fas"
              :class="
                container.status === 'running'
                  ? 'fa-check-circle'
                  : 'fa-times-circle'
              "
            />
          </span>
          {{ container.name }}
        </div>
        <div class="status-badge" :class="container.status">
          {{ container.status === "running" ? "실행중" : "중지됨" }}
        </div>
      </div>

      <div class="status-details">
        <div class="detail-row">
          <span class="label">이미지:</span>
          <span class="value">{{ container.image }}</span>
        </div>
        <div class="detail-row">
          <span class="label">생성일:</span>
          <span class="value">{{ container.created }}</span>
        </div>
        <div class="detail-row">
          <span class="label">포트:</span>
          <span class="value">{{ container.ports }}</span>
        </div>
        <div class="detail-row">
          <span class="label">시작 시간:</span>
          <span class="value">{{ container.startTime || "-" }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Container {
  name: string;
  status: "running" | "stopped";
  image: string;
  created: string;
  ports: string;
  startTime: string | null;
}

const containers: Container[] = [
  {
    name: "web-nginx",
    status: "running",
    image: "nginx:1.24.0-alpine",
    created: "5 days ago",
    ports: "80:80",
    startTime: "2024-11-21 09:23:10",
  },
  {
    name: "maria-db",
    status: "stopped",
    image: "mariadb:latest",
    created: "3 days ago",
    ports: "3306:3306",
    startTime: null,
  },
  {
    name: "redis-cache",
    status: "running",
    image: "redis:7.0-alpine",
    created: "1 day ago",
    ports: "6379:6379",
    startTime: "2024-11-19 13:32:09",
  },
];
</script>

<style scoped>
.container-status {
  display: flex;
  flex-direction: column;
  max-height: 90%;
  gap: 1rem;
  overflow-y: auto;
}
.container-status::-webkit-scrollbar {
  width: 10px;
}

.container-status::-webkit-scrollbar-track {
  background: #2c2f33;
  border-radius: 10px;
}

.container-status::-webkit-scrollbar-thumb {
  background-color: #9f9fa0;
  border-radius: 10px;
  border: 2px solid #2c2f33;
}

.container-status::-webkit-scrollbar-thumb:hover {
  background-color: #5b6eae;
}

.status-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: white;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.status-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.status-icon {
  color: #10b981;
}

.status-icon.stopped {
  color: #ef4444;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
}

.status-badge.running {
  background-color: #d1fae5;
  color: #047857;
}

.status-badge.stopped {
  background-color: #fee2e2;
  color: #b91c1c;
}

.status-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  gap: 0.5rem;
}

.label {
  color: #6b7280;
  min-width: 5rem;
}

.value {
  color: #111827;
}
</style>
