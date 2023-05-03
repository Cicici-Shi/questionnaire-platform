const routes = [
  {
    path: '/',
    redirect: '/main',
    meta: { index: 0 }
  },
  {
    path: '/main',
    component: () => import('../views/main.vue'),
    meta: { index: 1 }
    // beforeEnter: () => {
    //   const lastQuestion = getCookie('lastQuestion')
    //   if (lastQuestion) {
    //     const nextQuestion = parseInt(lastQuestion) + 1
    //     return '/chat/' + nextQuestion
    //   } else {
    //     return '/main'
    //   }
    // }
  },
  {
    path: '/consultant',
    component: () => import('../views/consultant.vue'),
    meta: { index: 2 }
  },
  {
    path: '/chat',
    component: () => import('../views/chat.vue'),
    meta: { index: 3 }
  },
  {
    path: '/accuracy',
    component: () => import('../views/accuracy.vue'),
    meta: { index: 4 }
  },
  {
    path: '/info',
    component: () => import('../views/info.vue'),
    meta: { index: 5 }
  }
]
export default routes
