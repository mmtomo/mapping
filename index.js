
import { createRouter, createWebHistory } from 'vue-router';
import TheStart from '@/components/Start.vue';
import TheTop from '@/components/Top.vue';
import NotFoundPage from '@/components/NotFoundPage.vue';

const routes = [
  { path: '/', name: 'TheStart', component: TheStart },
  { path: '/component-b', name: 'TheTop', component: TheTop },
  { path: '/:pathMatch(.*)*',name: 'NotFound',component: NotFoundPage}
]


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;