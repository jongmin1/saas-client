<template>
  <div class="card border-0 flex-fill custom-card mb-1">
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.custom-card {
  background-color: rgba(#000000, 0.2);
}
.card-body {
  max-height: 40vh;
}
</style>
