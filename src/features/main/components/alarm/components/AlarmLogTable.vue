<template>
  <div class="table-container">
    <table class="table table-dark">
      <!-- <caption>Alarm Logs</caption> -->
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">ID</th>
          <th scope="col">Type</th>
          <th scope="col">Message</th>
          <th scope="col">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in alarmArr" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.id }}</td>
          <td :class="getTextColorClass(item.type)">
            {{ item.type }}
          </td>
          <td>{{ item.message }}</td>
          <td>{{ formatTimestamp(item.timestamp) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import dayjs from "dayjs";
import { useAlarmStore } from "@features/main/components/alarm/stores/alarm";
import { storeToRefs } from "pinia";
import { getTextColorClass } from "@common/utils/alarmUtils";

const alarmStore = useAlarmStore();
const { alarmArr } = storeToRefs(alarmStore);
const intervalId = ref<number | undefined>(undefined);

function formatTimestamp(timestamp: string | undefined): string {
  return dayjs(timestamp).format("YYYY-MM-DD HH:mm");
}

onMounted(() => {
  alarmStore.fetchAlarm();
  intervalId.value = window.setInterval(() => {
    alarmStore.fetchAlarm();
  }, 5000); // 5sec
});

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});
</script>

<style scoped lang="scss">
.text-critical {
  color: #ff3b30;
}

.text-warning {
  color: #ffcc00;
}

.text-info {
  color: #34c759;
}

.text-debug {
  color: #6c757d;
}

.text-error {
  color: #ff8000;
}

.table-container {
  max-height: 90%;
  overflow-y: auto;
}

/* 스크롤바 디자인 */
.table-container::-webkit-scrollbar {
  width: 10px;
}

.table-container::-webkit-scrollbar-track {
  background: #2c2f33;
  border-radius: 10px;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #9f9fa0;
  border-radius: 10px;
  border: 2px solid #2c2f33;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background-color: #5b6eae;
}
</style>
