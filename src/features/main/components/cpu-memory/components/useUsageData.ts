import { computed } from 'vue';
import { useResourceStore } from '@features/main/components/cpu-memory/stores/usage';
import type { UsageData } from '@features/main/components/cpu-memory/stores/usage';

export const COLORS = {
  HIGH: "#ff4d4d",
  MEDIUM: "#f99d33",
  LOW: "#fbbb86",
} as const;

export const getColorByUsage = (usage: number): string => {
  if (usage >= 80) return COLORS.HIGH;
  if (usage >= 60) return COLORS.MEDIUM;
  return COLORS.LOW;
};

export function useUsageData(type: 'cpu' | 'memory') {
  const resourceStore = useResourceStore();
  
  return computed<UsageData[]>(() => {
    const items = type === 'cpu' 
      ? resourceStore.resourceStats?.nodes 
      : resourceStore.resourceStats?.clusters;
      
    if (!items?.length) return [];

    const usageKey = type === 'cpu' ? 'cpuUsage' : 'memoryUsage';

    return items
      .map(({ service, name, [usageKey]: usage, environment, team }) => ({
        name: `${service}-${name}`,
        percentage: Math.round(usage),
        color: getColorByUsage(usage),
        environment,
        team,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);
  });
} 