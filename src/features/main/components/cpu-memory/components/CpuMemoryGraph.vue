<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "vue-chartjs";
import { onMounted, onUnmounted, computed } from "vue";
import type { ChartData, ChartOptions } from "chart.js";
import { useHistoryStore } from "@features/main/components/cpu-memory/stores/usage-period";

ChartJS.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

const historyStore = useHistoryStore();

// 차트 데이터를 computed로 변경
const chartData = computed<ChartData<"line">>(() => ({
  labels: historyStore.historyData?.timeLabels || [],
  datasets: [
    {
      label: "memory",
      data:
        historyStore.historyData?.memoryUsage.map((point) => point.value) || [],
      borderColor: "#007bff",
      backgroundColor: "rgba(0, 123, 255, 0.3)",
      yAxisID: "y-memory",
    },
    {
      label: "cpu",
      data:
        historyStore.historyData?.cpuUsage.map((point) => point.value) || [],
      borderColor: "#dc3545",
      backgroundColor: "rgba(220, 53, 69, 0.3)",
      yAxisID: "y-cpu",
    },
  ],
}));

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      display: false,
    },
    legend: {
      position: "bottom",
      labels: {
        color: "white",
      },
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) =>
          `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "rgba(255, 255, 255, 0.2)",
      },
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
    },
    "y-memory": {
      type: "linear",
      position: "left",
      beginAtZero: true,
      min: -10,
      max: 120,
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
    },
    "y-cpu": {
      type: "linear",
      position: "right",
      beginAtZero: true,
      min: -10,
      max: 120,
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
};

// 컴포넌트 마운트시 데이터 fetch 시작
onMounted(() => {
  historyStore.startFetchInterval(12); // 24시간 데이터
});

// 컴포넌트 언마운트시 fetch 중지
onUnmounted(() => {
  historyStore.stopFetchInterval();
});
</script>

<style scoped>
.chart-container {
  position: relative;
  max-height: 100%;
  width: 100%;
}
</style>
