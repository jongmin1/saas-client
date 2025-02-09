import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
// import { API_BASE_URL } from '../config';

interface TimeSeriesPoint {
  value: number;
  timestamp: string;
}

interface TimeSeriesData {
  memoryUsage: TimeSeriesPoint[];
  cpuUsage: TimeSeriesPoint[];
  timeLabels: string[];
}

export const useHistoryStore = defineStore('history', () => {
  const historyData = ref<TimeSeriesData | null>(null);
  const errorMessage = ref<string | null>(null);
  let fetchIntervalId: number | undefined;

  const fetchHistory = async (hours: number = 24) => {
    try {
      const response = await axios.get(
        // `${API_BASE_URL}/api/test/resource/stats/history`
        '/api/test/resource/stats/history', {
          params: {
            hours: hours
          }
        }
      );
      historyData.value = response.data;
      // console.log('Fetched history data:', historyData.value);
    } catch (error) {
      errorMessage.value = '히스토리 데이터를 가져오는데 실패했습니다';
      console.error(error);
    }
  };

  const startFetchInterval = (hours: number = 24) => {
    fetchHistory(hours);
    fetchIntervalId = window.setInterval(() => fetchHistory(hours), 5000);
  };

  const stopFetchInterval = () => {
    if (fetchIntervalId) {
      window.clearInterval(fetchIntervalId);
      fetchIntervalId = undefined;
    }
  };

  return { 
    historyData, 
    errorMessage, 
    fetchHistory,
    startFetchInterval,
    stopFetchInterval 
  };
});