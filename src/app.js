import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import BaiduMap from 'vue-baidu-map'
import router, { mainRoutes } from '@/router'
import store from '@/store'
import BASE_URL from '../config/serve'
import App from './App'
import '@/components'
import '@/permission'

Vue.prototype.$base_url = BASE_URL
// 注册组件
Vue.use(ElementUI, { size: 'small' })
Vue.use(BaiduMap, { ak: 'ccL3AHgm0R1prHkC8XsrH9Vo16wf5V1W' })

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    this.$store.dispatch('initPage', mainRoutes)
    // 设置顶部导航菜单
    this.$store.dispatch('setMenuHeader', mainRoutes)
  },
  mounted() {
    // 初始化全屏监听
    this.$store.dispatch('fullscreenListener')
  },
  watch: {
    // 监听路由 控制侧边栏显示
    '$route.matched'(val) {
      const menuAside = mainRoutes.filter(menu => menu.path === val[0].path)
      this.$store.dispatch('appSetMenuAside', menuAside.length > 0 ? menuAside[0].children : [])
    }
  }
}).$mount('#app')
