const routes = [
  {
    path: '/:id/',
    redirect: '/:id/main',
    meta: { index: 0 },
  },
  {
    path: '/:id/main',
    component: () => import('../views/main.vue'),
    meta: { index: 1 },
  },
  {
    path: '/:id/consultant',
    component: () => import('../views/consultant.vue'),
    meta: { index: 2 },
  },
  {
    path: '/:id/chat',
    component: () => import('../views/chat.vue'),
    meta: { index: 3 },
  },
  {
    path: '/:id/accuracy',
    component: () => import('../views/accuracy.vue'),
    meta: { index: 4 },
  },
  {
    path: '/:id/info',
    component: () => import('../views/info.vue'),
    meta: { index: 5 },
  }
]
export default routes
