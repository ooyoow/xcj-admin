<template>
  <div class="app">
    <!-- 顶拦 -->
    <navbar :show="true"></navbar>
    <!-- 主体 -->
    <div class="app-container">
      <!-- 侧边菜单栏 -->
      <menu-aside :show="true"></menu-aside>
      <!-- 主体 -->
      <div class="app-container-main">
        <!-- 页面tabs -->
        <tabs class="app-container-main-tabs" />
        <!-- 主体内容 -->
        <div class="app-container-main-body">
          <transition name="fade-transverse">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from './components/navbar/index'
import MenuAside from './components/menuAside/index'
import Tabs from './components/tabs/index'
export default {
  name: 'appMain',
  components: {
    Navbar,
    MenuAside,
    Tabs
  }
}
</script>

