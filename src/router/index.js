import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(from, to)
  // next(false)
  // 判断是否后退
  if (from && to && from && to && from.meta.index >= to.meta.index) {
    // 阻止后退
    next(false)
  } else {
    // 其他情况正常跳转
    next()
  }
})

export default router
