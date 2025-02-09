<template>
  <div class="profile-row">
    <span class="label">{{ label }}</span>
    <span class="value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
}>();
</script>

<style scoped lang="scss">
.profile-row {
  display: flex;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  .label {
    width: 100px;
    color: #666;
    font-weight: 500;
  }

  .value {
    flex: 1;
    color: #333;
  }
}
</style>
