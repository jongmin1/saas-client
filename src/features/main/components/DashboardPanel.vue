<template>
  <main class="container-fluid">
    <!-- Top Section -->
    <div class="row g-1">
      <template v-for="item in topSection" :key="item.subtitle">
        <div class="col-12 col-md-6 d-flex">
          <CardComponent :title="item.title">
            <h6
              class="table-title text-white"
              :class="{ 'mb-2': item.marginBottom }"
            >
              {{ item.subtitle }}
            </h6>
            <component :is="item.component" />
          </CardComponent>
        </div>
      </template>
    </div>

    <!-- Middle Section -->
    <div class="row g-1">
      <div
        v-for="(item, index) in middleSection"
        :key="index"
        class="col-12 col-md-4 d-flex"
      >
        <CardComponent>
          <h6 v-if="item.subtitle" class="table-title text-white">
            {{ item.subtitle }}
          </h6>
          <component :is="item.component" />
        </CardComponent>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="row g-1">
      <div
        v-for="(item, index) in bottomSection"
        :key="index"
        class="col-12 col-md-4 d-flex"
      >
        <CardComponent>
          <component :is="item.component" />
        </CardComponent>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import AlarmDonutChart from "@features/main/components/alarm/components/AlarmDonutChart.vue";
import AlarmLogTable from "@features/main/components/alarm/components/AlarmLogTable.vue";
import CpuMemoryGraph from "@features/main/components/cpu-memory/components/CpuMemoryGraph.vue";
import CpuMemoryBar from "@features/main/components/cpu-memory/components/CpuMemoryBar.vue";
import DockerContainers from "@features/main/components/docker/components/DockerContainers.vue";
import GitMain from "@features/main/components/git/components/GitMain.vue";
import GitFrontend from "@features/main/components/git/components/GitFrontend.vue";
import GitBackend from "@features/main/components/git/components/GitBackend.vue";
import CardComponent from "@common/components/molecules/CardComponent.vue";

interface SectionItem {
  title?: string;
  subtitle?: string;
  component: ReturnType<typeof defineComponent>;
  marginBottom?: boolean;
}

const topSection: SectionItem[] = [
  {
    title: "",
    subtitle: "알람 로그",
    component: AlarmLogTable,
    marginBottom: true,
  },
  {
    title: "Donut Chart",
    subtitle: "알람 로그 분포",
    component: AlarmDonutChart,
  },
];

const middleSection: SectionItem[] = [
  { component: CpuMemoryBar },
  { subtitle: "메모리 사용량", component: CpuMemoryGraph },
  { subtitle: "컨테이너 상태 관리", component: DockerContainers },
];

const bottomSection: SectionItem[] = [
  { component: GitMain },
  { component: GitFrontend },
  { component: GitBackend },
];
</script>

<style lang="scss" scoped></style>
