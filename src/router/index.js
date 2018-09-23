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
        icon: 'folder-o',
        meta: { meta, title: '运营地图' },
        component: () => import('@/views/map')
      },
      {
        path: '/order',
        name: 'order',
        icon: 'folder-o',
        component: () => import('@/views/order'),
        meta: { meta, title: '交易驾驶舱' }
      },
      {
        path: '/store',
        name: 'store',
        icon: 'folder-o',
        component: () => import('@/views/store'),
        meta: { meta, title: '门店信息' }
      },
      {
        path: '/terminal',
        name: 'terminal',
        icon: 'folder-o',
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
        path: '/product/car/package',
        name: 'package',
        icon: 'folder-o',
        component: () => import('@/views/product/package'),
        meta: { meta, title: '套餐列表' }
      },
      {
        path: '/product/car/card',
        name: 'card',
        icon: 'folder-o',
        component: () => import('@/views/product/card'),
        meta: { meta, title: '限次卡' }
      },
      {
        path: '/product/car/coupon',
        name: 'coupon',
        icon: 'folder-o',
        component: () => import('@/views/product/coupon'),
        meta: { meta, title: '优惠券' }
      },
      {
        path: '/product/develop/configure',
        name: 'configure',
        icon: 'folder-o',
        component: () => import('@/views/product/configure'),
        meta: { meta, title: '产品配置' }
      }

      // {
      //   path: 'car',
      //   name: 'car',
      //   icon: 'folder-o',
      //   redirect: '/product/car/package',
      //   component: () => import('@/views/product'),
      //   meta: { meta, title: '洗车产品线' },
      //   children: [
      //     {
      //       path: '/product/car/package',
      //       name: 'package',
      //       icon: 'folder-o',
      //       component: () => import('@/views/product/package'),
      //       meta: { meta, title: '套餐列表' }
      //     },
      //     {
      //       path: '/product/car/card',
      //       name: 'card',
      //       icon: 'folder-o',
      //       component: () => import('@/views/product/card'),
      //       meta: { meta, title: '限次卡' }
      //     },
      //     {
      //       path: '/product/car/coupon',
      //       name: 'coupon',
      //       icon: 'folder-o',
      //       component: () => import('@/views/product/coupon'),
      //       meta: { meta, title: '优惠券' }
      //     }
      //   ]
      // },
      // {
      //   path: '/product/beauty',
      //   name: 'beauty',
      //   icon: 'folder-o',
      //   component: () => import('@/views/product'),
      //   meta: { meta, title: '美容产品线' }
      // },
      // {
      //   path: '/product/vas',
      //   name: 'vas',
      //   icon: 'folder-o',
      //   component: () => import('@/views/product'),
      //   meta: { meta, title: '增值服务' }
      // },
      // {
      //   path: '/product/mall',
      //   name: 'mall',
      //   icon: 'folder-o',
      //   component: () => import('@/views/product'),
      //   meta: { meta, title: '商城' }
      // },
      // {
      //   path: 'develop',
      //   name: 'develop',
      //   icon: 'folder-o',
      //   component: () => import('@/views/product'),
      //   meta: { meta, title: '产品研发' },
      //   children: [
      //     {
      //       path: '/product/develop/configure',
      //       name: 'configure',
      //       icon: 'folder-o',
      //       component: () => import('@/views/product/configure'),
      //       meta: { meta, title: '产品配置' }
      //     }
      //   ]
      // }
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
        path: '/oc/user/list',
        name: 'list',
        icon: 'folder-o',
        component: () => import('@/views/operation/user'),
        meta: { meta, title: '用户数据' }
      },
      {
        path: '/oc/user/portrait',
        name: 'portrait',
        icon: 'folder-o',
        component: () => import('@/views/operation/portrait'),
        meta: { meta, title: '会员画像' }
      },
      {
        path: '/oc/join/channel',
        name: 'channel',
        icon: 'folder-o',
        component: () => import('@/views/join/channel'),
        meta: { meta, title: '渠道开发' }
      }
      // {
      //   path: '/oc/user/customer',
      //   name: 'customer',
      //   icon: 'folder-o',
      //   component: () => import('@/views/test'),
      //   meta: { meta, title: '集团客户' }
      // },
      // {
      //   path: '/oc/user/service',
      //   name: 'service',
      //   icon: 'folder-o',
      //   component: () => import('@/views/test'),
      //   meta: { meta, title: '客服管理' }
      // }
    ]
    // children: [
    //   {
    //     path: 'user',
    //     name: 'user',
    //     icon: 'folder-o',
    //     redirect: '/oc/user/list',
    //     component: () => import('@/views/operation'),
    //     meta: { meta, title: '用户管理' },

    //   }
    // ]
  },
  {
    path: '/fd',
    name: 'fd',
    redirect: '/fd/summary',
    component: AppMain,
    meta: { meta, title: '财务中心' },
    children: [
      {
        path: '/fd/summary',
        name: 'summary',
        icon: 'folder-o',
        component: () => import('@/views/financial/summary'),
        meta: { meta, title: '综合统计' }
      },
      {
        path: '/fd/sale',
        name: 'sale',
        icon: 'folder-o',
        component: () => import('@/views/financial/sale'),
        meta: { meta, title: '销售统计' }
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    redirect: '/system/account',
    component: AppMain,
    meta: { meta, title: '系统管理' },
    children: [
      {
        path: '/system/account',
        name: 'account',
        icon: 'folder-o',
        component: () => import('@/views/system/account'),
        meta: { meta, title: '账户管理' }
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
