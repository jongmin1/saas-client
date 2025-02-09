// import { API_BASE_URL } from '@/config'; 
import axios from 'axios';
import { ref } from 'vue';
import { useUserStore } from '@features/auth/stores/auth';  // userStore import 추가

export interface ChatRequest {
    message: string;
    sender: string;
}

export interface ChatResponse {
    message: string;
    timestamp: string;
    sender: string;
}

export class ChatService {
    private message = ref('');
    private response = ref<ChatResponse | null>(null);
    private loading = ref(false);
    private messages = ref<{ id: number; sender: string; text: string }[]>([]);

    getMessage() { return this.message; }
    getResponse() { return this.response; }
    getLoading() { return this.loading; }
    getMessages() { return this.messages; }

    setMessage(newMessage: string) {
        this.message.value = newMessage;
    }

    private addMessage(sender: string, text: string) {
        this.messages.value.push({
            id: Date.now(),
            sender,
            text
        });
    }

    async sendMessage() {
        if (!this.message.value || this.loading.value) return;

        const userStore = useUserStore();  // userStore 인스턴스 생성
        this.loading.value = true;
        this.addMessage('user', this.message.value);

        try {
            const { data } = await axios.post<ChatResponse>(
            //   'http://localhost:5000/api/chat/send',
                '/api/chat/send',
                {
                    message: this.message.value,
                    sender: userStore.user?.name || 'Anonymous'  // 사용자 이름으로 변경, 없을 경우 'Anonymous'
                }
            );

            this.response.value = data;
            this.addMessage('ai', data.message);
            this.message.value = '';
            console.log('success to send message sender: ', userStore.user?.name);
        } catch (error) {
            console.error('failed to send message:', error);
            throw error;
        } finally {
            this.loading.value = false;
        }
    }

    async sendAlarmSummaryRequest(alarmData: any[]) {
        if (this.loading.value) return;

        const userStore = useUserStore();
        this.loading.value = true;
        
        // 알람 데이터를 문자열로 변환
        const alarmSummary = alarmData.map(alarm => 
          `[${alarm.type}] ${alarm.message} (${alarm.timestamp})`
        ).join('\n');
        
        const summaryRequest = `다음 알람 로그 내용을 요약해주세요:\n${alarmSummary}`;
        // this.addMessage('user', summaryRequest); // 사용자 메시지 표시 제거

        try {
            const { data } = await axios.post<ChatResponse>(
              'http://localhost:5000/api/chat/send',
              {
                message: summaryRequest,
                sender: userStore.user?.name || 'Anonymous'
              }
            );

            this.response.value = data;
            this.addMessage('ai', data.message); // AI 응답만 표시
            console.log('success to send alarm summary request');
        } catch (error) {
            console.error('failed to send alarm summary request:', error);
            throw error;
        } finally {
            this.loading.value = false;
        }
    }
}
