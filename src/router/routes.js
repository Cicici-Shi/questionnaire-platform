const routes = [
  {
    path: '/:id/',
    redirect: '/:id/main',
    meta: { index: 0 }
  },
  {
    path: '/:id/main',
    component: () => import('../views/main-view.vue'),
    meta: { index: 1 }
  },
  {
    path: '/:id/consultant',
    component: () => import('../views/consultant-view.vue'),
    meta: { index: 1 }
  },
  {
    path: '/:id/chat',
    component: () => import('../views/chat-view.vue'),
    meta: { index: 1 }
  },
  {
    path: '/:id/chat2',
    component: () => import('../views/chat2-view.vue'),
    meta: { index: 1 }
  },
  {
    path: '/:id/accuracy',
    component: () => import('../views/accuracy-view.vue'),
    meta: { index: 1 }
  },
  {
    path: '/:id/info',
    component: () => import('../views/info-view.vue'),
    meta: { index: 1 }
  },
  {
    path: '/:id/end',
    component: () => import('../views/end-view.vue'),
    meta: { index: 2 }
  }
]
export default routes
