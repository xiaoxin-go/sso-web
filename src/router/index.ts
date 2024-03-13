import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import {store} from "@/store";

const routes: Array<RouteRecordRaw> = [
  {path: '/login', name: 'Login', component: () => import('@/views/auth/Login.vue')},
  {path: '/register', name: 'Register', component: () => import('@/views/auth/Register.vue')},
  {path: '/system/menu', name: 'Menu', component: () => import('@/views/system/menu/list.vue')},
  {path: '/system/user', name: 'User', component: () => import('@/views/system/user/list.vue')},
  {path: '/system/role', name: 'Role', component: () => import('@/views/system/role/list.vue')},
  {path: '/system/api', name: 'Api', component: () => import('@/views/system/api/list.vue')},
  {path: '/system/log', name: 'Log', component: () => import('@/views/system/log/list.vue')},
  {path: '/tenement', name: 'Tenement', component: () => import('@/views/tenement/list.vue')},
  {path: '/platform', name: 'Platform', component: () => import('@/views/platform/list.vue')},
  {path: '/platform_user', name: 'PlatformUser', component: () => import('@/views/platform_user/list.vue')},
  {path: '/platform_kind', name: 'PlatformKind', component: () => import('@/views/platform_kind/list.vue')},
  {path: '/platform/self', name: 'PlatformSelf', component: () => import('@/views/platform/self.vue')},
  {path: '/home', name: 'Home', component: () => import('@/views/Home.vue')},
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
      store.currentPath = to.path
    }
)

export default router
