import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
// import { API_BASE_URL } from '../config'; 

interface ResourceMetric {
  id: string;
  name: string;
  cpuUsage: number;
  memoryUsage: number;
  environment: string;
  service: string;
  team: string;
}

interface MonitoringStats {
  clusters: ResourceMetric[];
  nodes: ResourceMetric[];
  timeSeriesData: TimeSeriesData;
  totalCpuUsage: number;
  totalMemoryUsage: number;
}

interface TimeSeriesData {
  memoryUsage: Array<{value: number, timestamp: string}>;
  cpuUsage: Array<{value: number, timestamp: string}>;
}

export interface UsageData {
  name: string;
  percentage: number;
  color: string;
  environment: string;
  team: string;
}

export const useResourceStore = defineStore('resource', () => {
  const resourceStats = ref<MonitoringStats | null>(null);
  const errorMessage = ref<string | null>(null);
  let fetchIntervalId: number | undefined;
  // const first = ref(true);

  const fetchResourceStats = async () => {
    try {
      // const response = await axios.get(`${API_BASE_URL}/api/test/resource/stats`);
      const response = await axios.get('/api/test/resource/stats');
      resourceStats.value = response.data;
      // if (first.value) {
      //   console.log('usage data fetched:', resourceStats.value);
      //   first.value = false;
      // }
      // console.log('Fetched resource stats:', resourceStats.value);
    } catch (error) {
      errorMessage.value = '리소스 통계 데이터를 가져오는데 실패했습니다';
      console.error(error);
    }
  };

  const startFetchInterval = () => {
    fetchResourceStats();
    fetchIntervalId = window.setInterval(fetchResourceStats, 5000);
  };

  const stopFetchInterval = () => {
    if (fetchIntervalId) {
      window.clearInterval(fetchIntervalId);
      fetchIntervalId = undefined;
    }
  };

  return { 
    resourceStats, 
    errorMessage, 
    fetchResourceStats,
    startFetchInterval,
    stopFetchInterval 
  };
});
