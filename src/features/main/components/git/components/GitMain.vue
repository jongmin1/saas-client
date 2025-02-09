<template>
  <div class="git-status">
    <div v-for="branch in branches" :key="branch.name" class="branch-container">
      <div class="branch-header">
        <span class="branch-icon">🔀</span>
        <span class="branch-name text-white">{{ branch.name }}</span>
        <span class="last-update text-white"
          >마지막 업데이트: {{ branch.lastUpdate }}</span
        >
      </div>

      <div
        v-for="commit in branch.commits"
        :key="commit.hash"
        class="commit-item"
      >
        <div class="commit-hash">
          <span class="hash-icon text-white">↪️</span>
          {{ commit.hash }}
        </div>
        <div class="commit-message text-white">
          {{ commit.message }}
        </div>
        <div class="commit-meta">
          <span class="author text-white">{{ commit.author }}</span>
          <span class="date text-white">{{ commit.date }}</span>
        </div>
        <div class="commit-stats">
          <span class="additions text-white">+{{ commit.additions }}</span>
          <span class="deletions text-white">-{{ commit.deletions }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GitStatus",
  data() {
    return {
      branches: [
        {
          name: "main",
          lastUpdate: "2024-11-23 17:32",
          commits: [
            {
              hash: "a1b2c3d",
              message: "feat: git 상태 모니터링 기능 추가",
              author: "Lee",
              date: "2024-11-23 15:30",
              additions: 120,
              deletions: 45,
            },
            {
              hash: "e4f5g6h",
              message: "fix: 로그인 버그 수정",
              author: "Lee Engineer",
              date: "2024-03-19 14:20",
              additions: 15,
              deletions: 8,
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.git-status {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  /* padding: 1rem; */
  max-height: 100%;
  overflow-y: auto;
}
.git-status::-webkit-scrollbar {
  width: 10px;
}

.git-status::-webkit-scrollbar-track {
  background: #2c2f33;
  border-radius: 10px;
}

.git-status::-webkit-scrollbar-thumb {
  background-color: #9f9fa0;
  border-radius: 10px;
  border: 2px solid #2c2f33;
}

.git-status::-webkit-scrollbar-thumb:hover {
  background-color: #5b6eae;
}

.branch-container {
  /* background: #f6f8fa; */
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 1rem;
}

.branch-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.branch-name {
  font-weight: bold;
  font-size: 1.1rem;
}

.last-update {
  color: #666;
  margin-left: auto;
  font-size: 0.9rem;
}

.commit-item {
  /* background: white; */
  border: 1px solid #303031;
  border-radius: 4px;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
}

.commit-hash {
  font-family: monospace;
  color: #6a737d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.commit-message {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.commit-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
}

.commit-stats {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.additions {
  color: #28a745;
  margin-right: 0.5rem;
}

.deletions {
  color: #d73a49;
}
</style>
