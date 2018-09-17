/**
 * 路由拦截
 * 权限验证
 */
import { getCookie } from '@/utils/cookie'
import router from '@/router'

router.beforeEach((to, from, next) => {
  next()
  const token = getCookie('token')
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach(to => {
  // 需要的信息
  const app = router.app
  const { name, params, query } = to
  // 多页控制 打开新的页面
  app.$store.dispatch('openPage', { name, params, query })
  // 更改标题
  // util.title(to.meta.title)
})
