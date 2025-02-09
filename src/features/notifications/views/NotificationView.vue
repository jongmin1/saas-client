<template>
  <BaseLayout>
    <template #content>
      <NotificationPanel />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@common/components/layout/BaseLayout.vue";
import NotificationPanel from "@features/notifications/components/NotificationPanel.vue";
</script>

<style lang="scss" scoped></style>
