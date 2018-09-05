<template>
  <div class="menu-side">
    <el-menu class="menu-side-content" :collapse="isMenuAsideCollapse" :unique-opened="true" :default-active="active" ref="menu" @select="handleMenuSelect">
      <template v-for="(menu, menuIndex) in menuAside">
        <menu-item-aside v-if="menu.children === undefined" :menu="menu" :key="menuIndex" />
        <menu-sub-aside v-else :menu="menu" :key="menuIndex" />
      </template>
    </el-menu>
    <div v-if="menuAside.length === 0 && !isMenuAsideCollapse" class="layout-header-aside-menu-empty">
      <icon name="inbox" />
      <span>没有侧栏菜单</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import menuMixin from '../mixin'
import menuSubAside from './menu-sub'
import menuItemAside from './menu-item'
export default {
  name: 'layout-header-aside-menu-side',
  mixins: [menuMixin],
  components: {
    menuSubAside,
    menuItemAside
  },
  data() {
    return {
      active: '',
      asideHeight: 300,
      BS: null
    }
  },
  computed: {
    ...mapState({
      menuAside: state => state.app.menuAside,
      isMenuAsideCollapse: state => state.app.isMenuAsideCollapse
    })
  },
  watch: {
    // 折叠和展开菜单的时候销毁 better scroll
    isMenuAsideCollapse(val) {
      this.scrollDestroy()
      setTimeout(() => {
        this.scrollInit()
      }, 500)
    },
    // 监听路由 控制侧边栏激活状态
    '$route.matched': {
      handler(val) {
        this.active = val[val.length - 1].path
        this.$nextTick(() => {
          if (this.menuAside.length > 0) {
            this.$refs.menu.activeIndex = this.active
          }
        })
      },
      immediate: true
    }
  },
  mounted() {
    // this.scrollInit();
  },
  beforeDestroy() {
    // this.scrollDestroy();
  },
  methods: {
    //   scrollInit() {
    //     this.BS = new BScroll(this.$el, {
    //       mouseWheel: true
    //       // 如果你愿意可以打开显示滚动条
    //       // scrollbar: {
    //       //   fade: true,
    //       //   interactive: false
    //       // }
    //     });
    //   },
    //   scrollDestroy() {
    //     if (this.BS) {
    //       this.BS.destroy();
    //     }
    //   }
  }
}
</script>
