<template>
  <div class="chart-container">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Doughnut } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useAlarmStore } from "@features/main/components/alarm/stores/alarm";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Filler);

const alarmStore = useAlarmStore();
const { alarmArr } = storeToRefs(alarmStore);

// 차트에 표시될 타입들의 순서 정의 (critical이 가장 먼저 표시됨)
const TYPE_ORDER = ["critical", "error", "warning", "info", "debug"] as const;
type LogType = (typeof TYPE_ORDER)[number];

// 각 타입별 색상 매핑 정의
const COLOR_CLASS_MAP = {
  critical: "#FF3B30",
  warning: "#FFCC00",
  info: "#34C759",
  debug: "#6C757D",
  error: "#FF8000",
} as const;

/* 알람 데이터에서 타입별 개수를 집계 */
function getTypeCounts(data: typeof alarmArr.value) {
  return data.reduce((counts, item) => {
    counts[item.type] = (counts[item.type] || 0) + 1;
    return counts;
  }, {} as Record<LogType, number>);
}

/* 반응형 데이터 계산  (타입별 개수, 전체 로그 수) */
const typeCounts = computed(() => getTypeCounts(alarmArr.value));
const totalLogs = computed(() =>
  Object.values(typeCounts.value).reduce((acc, count) => acc + count, 0)
);

/* 정렬된 차트 데이터 준비 (TYPE_ORDER 순서대로) */
const sortedEntries = computed(() =>
  TYPE_ORDER.filter((type) => type in typeCounts.value).map((type) => ({
    type,
    count: typeCounts.value[type] || 0,
    color: COLOR_CLASS_MAP[type],
  }))
);

const chartData = computed<ChartData<"doughnut">>(() => ({
  labels: sortedEntries.value.map((entry) => entry.type),
  datasets: [
    {
      label: "Dataset",
      data: sortedEntries.value.map((entry) => entry.count),
      backgroundColor: sortedEntries.value.map((entry) => entry.color),
      hoverBackgroundColor: sortedEntries.value.map((entry) => entry.color),
      hoverOffset: 4,
    },
  ],
}));

/* Chart.js 옵션 설정 */
const chartOptions: ChartOptions<"doughnut"> = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      align: "start",
      labels: {
        generateLabels(chart) {
          return sortedEntries.value.map((entry, i) => {
            const percentage = ((entry.count / totalLogs.value) * 100).toFixed(
              1
            );
            return {
              fontColor: "white",
              text: `${entry.type}: ${entry.count}건 (${percentage}%)`,
              fillStyle: entry.color,
              hidden: !chart.getDataVisibility(i),
              index: i,
            };
          });
        },
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      titleColor: "white",
      bodyColor: "white",
      callbacks: {
        label: (tooltipItem: any) => {
          const value = tooltipItem.raw;
          const percentage = ((value / totalLogs.value) * 100).toFixed(1);
          return `${tooltipItem.label}: ${value}건 (${percentage}%)`;
        },
      },
    },
    datalabels: {
      color: "white",
      font: {
        weight: "bold" as const,
        size: 14,
      },
      formatter: (_, context) => sortedEntries.value[context.dataIndex].type,
    },
  },
};
</script>

<style lang="scss">
.chart-container {
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
