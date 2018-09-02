import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import app from './modules/app'
import map from './modules/map'
import order from './modules/order'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    login,
    app,
    map,
    order
  },
  getters: {}
})

export default store
