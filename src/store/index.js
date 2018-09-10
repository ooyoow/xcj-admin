import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import app from './modules/app'
import theme from './modules/theme'
import map from './modules/map'
import order from './modules/order'
import product from './modules/product'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    login,
    app,
    theme,
    map,
    order,
    product
  },
  getters: {}
})

export default store
