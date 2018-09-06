<template>
  <div class="app-frame">
    <!-- 顶拦 -->
    <navbar :show="true"></navbar>
    <!-- 主体 -->
    <div class="main-container">
      <!-- 侧边菜单栏 -->
      <menu-aside :show="true"></menu-aside>
      <!-- 主题内容 -->
      <div class="main-container-body">
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
import navbar from './components/navbar/index'
import menuAside from './components/menuAside/index'
// import Tabs from './tabs/index'
export default {
  name: 'appMain',
  components: {
    navbar,
    menuAside
  }
}
</script>

