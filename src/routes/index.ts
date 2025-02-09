import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@features/auth/stores/auth';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/features/main/views/DashboardView.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@features/auth/pages/LoginView.vue'),
    },
    {
        path: '/operations',
        name: 'Operations',
        component: () => import('@features/operations/views/OperationsView.vue'),
    },
    {
        path: '/notification',
        name: 'Notification',
        component: () => import('@features/notifications/views/NotificationView.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, _, next) => {
    const userStore = useUserStore();
    const isAuthenticated = !!userStore.user;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ 
            name: 'Login',
            query: { redirect: to.fullPath }
        });
    } else if (to.name === 'Login' && isAuthenticated) {
        next({ name: 'dashboard' });
    } else {
        next();
    }
});

export default router; 