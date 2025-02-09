import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '@config/config'; 

interface Alarm {
  id: string;
  type: 'debug' | 'warning' | 'info' | 'critical' | 'error';
  message: string;
  timestamp: string;
}

export const useAlarmStore = defineStore('alarm', () => {
  // const first = ref(true);
  const alarmArr = ref<Alarm[]>([]);
  const errorMessage = ref<string | null>(null);

  const fetchAlarm = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/alerts`);
      // const response = await axios.get('/api/alerts');
      alarmArr.value = response.data.data || response.data;
      
      // if (first.value) {
      //   console.log('alarms fetched:', alarmArr.value);
      //   first.value = false;
      // }
    } catch (error) {
      errorMessage.value = 'Failed to fetch alarm data';
      console.error(error);
    }
  };

  return { alarmArr, errorMessage, fetchAlarm };
});
