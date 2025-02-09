<template>
  <BaseLayout>
    <template #content>
      <MainPanel />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@common/components/layout/BaseLayout.vue";
import MainPanel from "@features/main/components/DashboardPanel.vue";
</script>

<style lang="scss" scoped></style>
