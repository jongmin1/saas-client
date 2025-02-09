<template>
  <div class="info-row">
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

<style lang="scss" scoped>
.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  .label {
    font-weight: 500;
    color: #6c757d;
  }

  .value {
    text-align: right;
  }
}
</style>
