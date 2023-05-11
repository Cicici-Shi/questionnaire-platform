import { createRouter, createWebHashHistory } from 'vue-router'
import { useLoadingStore } from '@/store'
import routes from './routes.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  const store = useLoadingStore()
  // 判断是否后退
  if (from && to && from && to && from?.meta?.index > to?.meta?.index) {
    store.startLoading()
    return false
  } else {
    store.startLoading()
    return true
  }
})

export default router
