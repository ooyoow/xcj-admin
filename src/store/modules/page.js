const defaultPage = [
  {
    name: 'index',
    meta: {
      title: '首页',
      requiresAuth: false
    }
  }
]

export default {
  state: {
    pool: [], // 可以在多页 tab 模式下显示的页面
    opened: defaultPage, // 当前显示的多页面列表
    current: '' // 当前页面
  },
  getters: {},
  mutations: {
    OPENED_UPDATE: (state, { index, params, query }) => {
      // 更新页面列表某一项
      let page = state.opened[index]
      page.params = params || page.params
      page.query = query || page.query
      state.opened.splice(index, 1, page)
    },
    ADD_PAGE: (state, { tag, params, query }) => {
      // 设置新的 tag 在新打开一个以前没打开过的页面时使用
      let newTag = tag
      newTag.params = params || newTag.params
      newTag.query = query || newTag.query
      // 添加进当前显示的页面数组
      state.opened.push(newTag)
      console.log(state.opened, 'state.opened')
    },
    CURRENT_SET: (state, name) => {
      state.current = name
    },
    CLOSE_PAGE: () => {},
    CLOSE_ALL_PAGE: state => {
      state.opened.splice(1)
    },
    INIT_PAGE: (state, pool) => {
      state.pool = pool
    }
  },
  actions: {
    openPage({ state, commit }, { name, params, query }) {
      console.log(name, 'name')
      // 已经打开的页面
      let opened = state.opened
      // 判断此页面是否已经打开 并且记录位置
      let pageOpendIndex = 0
      const pageOpend = opened.find((page, index) => {
        const same = page.name === name
        pageOpendIndex = same ? index : pageOpendIndex
        return same
      })
      if (pageOpend) {
        // 页面以前打开过 但是新的页面可能 name 一样，参数不一样
        commit('OPENED_UPDATE', {
          index: pageOpendIndex,
          params,
          query
        })
      } else {
        // 页面以前没有打开过
        let page = state.pool.find(t => t.name === name)
        if (page) {
          commit('ADD_PAGE', { tag: page, params, query })
        }
      }
      commit('CURRENT_SET', name)
    },
    closePage() {},
    closeAllPage({ commit }) {
      commit('CLOSE_ALL_PAGE')
    },
    initPage({ commit }, routes) {
      const pool = []
      const push = routes => {
        routes.forEach(route => {
          if (route.children) {
            push(route.children)
          } else {
            const { meta, name, path } = route
            pool.push({ meta, name, path })
          }
        })
      }
      push(routes)
      commit('INIT_PAGE', pool)
    }
  }
}
