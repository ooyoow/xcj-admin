import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import AppMain from '@/views/layout/index'

const meta = { requiresAuth: true }

// 登录
const loginFrame = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }
]

// 错误页面
const errorPage = [
  {
    path: '*',
    name: '404',
    component: () => import('@/views/errorPage/404')
  }
]

// 主框架
const mainFrame = [
  {
    path: '',
    redirect: '/map',
    component: AppMain,
    meta: { meta, title: '首页' },
    children: [
      {
        path: '/map',
        name: 'map',
        icon: 'map',
        meta: { meta, title: '运营地图' },
        component: () => import('@/views/map')
      },
      {
        path: '/order',
        name: 'order',
        icon: 'home',
        component: () => import('@/views/order'),
        meta: { meta, title: '交易驾驶舱' }
      },
      {
        path: '/store',
        name: 'store',
        icon: 'home',
        component: () => import('@/views/store'),
        meta: { meta, title: '门店信息' }
      },
      {
        path: '/terminal',
        name: 'terminal',
        icon: 'home',
        component: () => import('@/views/terminal'),
        meta: { meta, title: '终端信息' }
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    redirect: '/product/car/package',
    component: AppMain,
    meta: { meta, title: '产品中心' },
    children: [
      {
        path: 'car',
        name: 'car',
        icon: 'map',
        redirect: '/product/car/package',
        component: () => import('@/views/product'),
        meta: { meta, title: '洗车产品线' },
        children: [
          {
            path: '/product/car/package',
            name: 'package',
            icon: 'map',
            component: () => import('@/views/product/package'),
            meta: { meta, title: '套餐列表' }
          },
          {
            path: '/product/car/card',
            name: 'card',
            icon: 'map',
            component: () => import('@/views/product/card'),
            meta: { meta, title: '限次卡' }
          },
          {
            path: '/product/car/coupon',
            name: 'coupon',
            icon: 'map',
            component: () => import('@/views/product/coupon'),
            meta: { meta, title: '优惠券' }
          }
        ]
      },
      {
        path: '/product/beauty',
        name: 'beauty',
        icon: 'map',
        component: () => import('@/views/product'),
        meta: { meta, title: '美容产品线' }
      },
      {
        path: '/product/vas',
        name: 'vas',
        icon: 'map',
        component: () => import('@/views/product'),
        meta: { meta, title: '增值服务' }
      },
      {
        path: '/product/mall',
        name: 'mall',
        icon: 'map',
        component: () => import('@/views/product'),
        meta: { meta, title: '商城' }
      },
      {
        path: 'develop',
        name: 'develop',
        icon: 'map',
        component: () => import('@/views/product'),
        meta: { meta, title: '产品研发' },
        children: [
          {
            path: '/product/develop/configure',
            name: 'configure',
            icon: 'map',
            component: () => import('@/views/product/configure'),
            meta: { meta, title: '产品配置' }
          }
        ]
      }
    ]
  },
  {
    path: '/oc',
    name: 'oc',
    redirect: '/oc/user/list',
    component: AppMain,
    meta: { meta, title: '运营中心' },
    children: [
      {
        path: 'user',
        name: 'user',
        icon: 'map',
        redirect: '/oc/user/list',
        component: () => import('@/views/operation'),
        meta: { meta, title: '用户管理' },
        children: [
          {
            path: '/oc/user/list',
            name: 'list',
            icon: 'map',
            component: () => import('@/views/operation/user'),
            meta: { meta, title: '用户数据' }
          },
          {
            path: '/oc/user/portrait',
            name: 'portrait',
            icon: 'map',
            component: () => import('@/views/operation/portrait'),
            meta: { meta, title: '会员画像' }
          },
          {
            path: '/oc/user/customer',
            name: 'customer',
            icon: 'map',
            component: () => import('@/views/test'),
            meta: { meta, title: '集团客户' }
          },
          {
            path: '/oc/user/service',
            name: 'service',
            icon: 'map',
            component: () => import('@/views/test'),
            meta: { meta, title: '客服管理' }
          }
        ]
      }
    ]
  }
]

const routes = [...loginFrame, ...mainFrame, ...errorPage]
const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

// 导出主框架路由
export const mainRoutes = mainFrame
export default router
