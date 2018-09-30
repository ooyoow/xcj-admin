import 'babel-polyfill'
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
import '@/libs/element-ui'
import '@/assets/icon/iconfont.css'
import router, { mainRoutes } from '@/router'
import store from '@/store'
import BASE_URL, { FILE_BASE_URL } from '../config/serve'
import App from './App'
import '@/components'
import '@/permission'

Vue.prototype.$base_url = BASE_URL
Vue.prototype.$file_base_url = FILE_BASE_URL
// 注册组件
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
