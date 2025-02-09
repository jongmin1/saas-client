import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';

/* 디버깅 */
axios.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

axios.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

interface User {
  id: string;
  name: string;
  department: string;
  roles: string[];
  token?: string;
}

interface LoginRequest {
  id: string;
  password: string;
}

export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  // const API_URL = 'http://localhost:8080';
  
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAdmin = computed(() => user.value?.roles.includes('ROLE_ADMIN') ?? false);
  
  const login = async (credentials: LoginRequest) => {
    isLoading.value = true;
    error.value = null;

    // console.log('로그인 시도:', credentials);

    try {
      // console.log('API 요청 시작');
      // // const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
      // const response = await axios.post('/api/auth/login', credentials);
      // console.log('API 응답:', response.data);

      const userData: User = {
        // id: response.data.id,
        // name: response.data.name,
        // department: response.data.department,
        // roles: response.data.roles,
        // token: response.data.token
        id: 'admin',
        name: 'admin',
        department: '공정기술팀',
        roles: ['ROLE_ADMIN'],
        token: 'dummy-token-123'
      };

      user.value = userData;
      sessionStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      
      return true;

    } catch (err: any) {
      console.error('로그인 에러:', err);
      // error.value = err.response?.data?.message || '로그인에 실패했습니다.';
      error.value = '로그인에 실패했습니다.';
      return false;
      
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    try {
      user.value = null;
      sessionStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      router.push('/login');
      return { success: true };
    } catch (err) {
      error.value = '로그아웃 처리 중 오류가 발생했습니다.';
      return { success: false, error: error.value };
    }
  };

  const initializeUser = () => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as User;
      user.value = parsedUser;
      if (parsedUser.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
      }
    }
  };

  const hasRole = (role: string) => {
    return user.value?.roles.includes(role) ?? false;
  };

  return {
    user,
    isLoading,
    error,
    isAdmin,
    login,
    logout,
    initializeUser,
    hasRole,
  };
});