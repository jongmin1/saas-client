<template>
  <section class="container text-white m-0 p-0">
    <div class="container__title">
      <h6>{{ title }}</h6>
    </div>
    <div class="container__content">
      <TransitionGroup name="list">
        <div
          v-for="item in data"
          :key="item.name"
          class="container__content__component"
        >
          <div class="container__content__component--name col-3">
            <span>{{ item.name }}</span>
            <small class="environment">[{{ item.environment }}]</small>
            <small class="team">{{ item.team }}</small>
          </div>
          <div
            class="container__content__component--bar-container col-8"
            :aria-label="`${item.name} 사용량: ${item.percentage}%`"
          >
            <div
              class="container__content__component--bar-fill"
              :style="{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
              }"
            />
          </div>
          <div class="container__content__component--value col-1">
            <span>{{ item.percentage }}%</span>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { UsageData } from "@features/main/components/cpu-memory/stores/usage";

defineProps<{
  title: string;
  data: UsageData[];
}>();
</script>

<style lang="scss" scoped>
/* 트랜지션 */
.list {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }

  &-leave-active {
    position: absolute;
    width: 100%;
    pointer-events: none;
  }
}

/* 컨테이너 스타일 */
.container {
  &__title {
    margin-bottom: 1rem;
  }

  &__content {
    position: relative;
    max-height: 30vh;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;

    &::-webkit-scrollbar {
      width: 7px;

      &-track {
        background: #2c2f33;
        border-radius: 10px;
      }

      &-thumb {
        background-color: #9f9fa0;
        border-radius: 10px;
        border: 2px solid #2c2f33;

        &:hover {
          background-color: #5b6eae;
        }
      }
    }
  }

  &__content__component {
    display: flex;
    align-items: center;
    margin: 1.3rem 0;

    &--name {
      font-size: 0.7rem;
      text-align: left;

      .environment {
        color: #a0a0a0;
        margin-left: 0.3rem;
        font-size: 0.6rem;
      }

      .team {
        display: block;
        color: #8a8a8a;
        font-size: 0.6rem;
      }
    }

    &--bar {
      &-container {
        flex: 2 1 auto;
        background-color: #e0e0e0;
        border-radius: 10px;
        overflow: hidden;
      }

      &-fill {
        height: 1.5rem;
        border-radius: 10px;
        transform-origin: left;
      }
    }

    &--value {
      flex: 0 1 20%;
      font-size: 0.9rem;
      text-align: right;
      white-space: nowrap;
    }
  }
}
</style>
