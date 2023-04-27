const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('../views/main.vue')
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
    component: () => import('../views/consultant.vue')
  },
  {
    path: '/chat',
    component: () => import('../views/chat.vue')
  },
  {
    path: '/accuracy',
    component: () => import('../views/accuracy.vue')
  },
  {
    path: '/info',
    component: () => import('../views/info.vue')
  }
]
export default routes

// 获取 cookie
function getCookie(name) {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
}
