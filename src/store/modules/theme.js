// 配置文件
import themeList from '../../../config/theme'

export default {
  state: {
    // 主题
    themeList: themeList,
    // 当前激活主题
    activeKey: themeList[0].key
  },
  mutations: {
    SET_THEME: (state, themeKey) => {
      state.activeKey = themeKey
    }
  },
  actions: {
    /**
     * @description 将 vuex 中的主题应用到 dom
     * @param {Object} state vuex state
     */
    setBodyClassName(state) {
      document.body.className = `theme-${state.activeKey}`
    },
    /**
     * @description 激活一个主题
     * @param {Object} state vuex state
     * @param {String} themeKey 需要激活的主题key
     */
    setTheme({ commit }, themeKey) {
      document.body.className = `theme-${themeKey}`
      commit('SET_THEME', themeKey)
    }
  }
}
