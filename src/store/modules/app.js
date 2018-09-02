import screenfull from 'screenfull'
import themeList from '../../../config/theme'

const app = {
  state: {
    // 用户信息
    userInfo: {},

    // 顶部菜单
    menuHeader: {},

    // 侧栏菜单
    menuAside: {},

    // 侧边栏收缩
    isMenuAsideCollapse: false,

    // 全屏
    isScreenFull: false,

    // 主题
    themeList: themeList,

    // 当前激活的主题
    activeThemeName: themeList[0].key,

    // 在主框架可显示的页面
    pageList: [],

    // 已打开的页面（tabs）
    openPageList: [],

    // 当前页面
    pageCurrent: ''
  },
  mutations: {
    APP_SET_FULL_SCREEN: (state, isScreenFull) => {
      state.isScreenFull = isScreenFull
    },
    APP_SET_MENU_HEADER: (state, menuList) => {
      state.menuHeader = menuList
    },
    APP_SET_MENU_ASIDE: (state, menuList) => {
      state.menuAside = menuList
    }
  },
  actions: {
    /**
     * @class isFullScreen
     * @description 切换全屏
     * @param {vuex state} state vuex state
     */
    appToggleFullScreen({ commit }) {
      let isFullscreen = false
      if (screenfull.isFullscreen) {
        screenfull.exit()
      } else {
        screenfull.request()
        isFullscreen = true
      }
      this.commit('APP_SET_FULL_SCREEN', isFullscreen)
    },
    /**
     * @description 设置顶栏菜单
     * @param {Array} menuList menu setting
     */
    setMenuHeader({ commit }, menuList) {
      const navMenu = menuList.filter(menu => {
        return menu.meta.title
      })
      commit('APP_SET_MENU_HEADER', navMenu)
    },
    /**
     * @description 设置侧边栏菜单
     * @param {Array} menuList menu setting
     */
    appSetMenuAside({ commit }, menuList) {
      commit('APP_SET_MENU_ASIDE', menuList)
    }
  }
}

export default app
