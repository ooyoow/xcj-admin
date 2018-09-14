<template>
  <div class="app-frame">
    <!-- 顶拦 -->
    <navbar :show="true"></navbar>
    <!-- 主体 -->
    <div class="main-container">
      <!-- 侧边菜单栏 -->
      <menu-aside :show="true"></menu-aside>
      <!-- 主体内容 -->
      <div class="main-container-body">
        <div class="main-container-body-tabs">
          <tabs/>
        </div>
        <transition name="fade-transverse">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </transition>
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

