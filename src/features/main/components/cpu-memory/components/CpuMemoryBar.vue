<template>
  <div class="chart-group d-flex justify-content-between align-items-start">
    <div class="m-0 p-0">
      <StateBar title="노드 CPU 사용량 Top5" :data="nodeData" />
    </div>
    <div class="m-0 p-0 ms-2">
      <StateBar title="컨테이너 메모리 사용량 Top5" :data="clusterData" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useResourceStore } from "@features/main/components/cpu-memory/stores/usage";
import { useUsageData } from "@features/main/components/cpu-memory/components/useUsageData";
import StateBar from "@features/main/components/cpu-memory/components/StateBar.vue";

const nodeData = useUsageData("cpu");
const clusterData = useUsageData("memory");

const resourceStore = useResourceStore();

onMounted(() => {
  resourceStore.startFetchInterval();
});

onUnmounted(() => {
  resourceStore.stopFetchInterval();
});
</script>

<style scoped>
.chart-group {
  display: flex;
  /* gap: 1rem; */
  width: 100%;
  height: 100%;
  min-width: 0;
}

.chart-group > * {
  flex: 1;
  min-width: 0;
  width: 0;
}

.chart-group > :nth-child(2) {
  /* border-left: 1px solid #ffffff33; */
  margin-left: 2rem;
  padding-left: 1.5rem;
}
</style>
