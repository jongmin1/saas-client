<template>
  <BaseLayout>
    <template #content>
      <OperationsPanel />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import OperationsPanel from "@features/operations/components/OperationsPanel.vue";
import BaseLayout from "@common/components/layout/BaseLayout.vue";
</script>

<style lang="scss" scoped></style>
