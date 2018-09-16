<template>
  <div class="menu-side">
    <div class="collapse-btn" @click="appSetAsideCollapse">
      <i v-if="isMenuAsideCollapse" class="el-icon-arrow-right"></i>
      <i v-else class="el-icon-arrow-left"></i>
    </div>
    <el-menu class="menu-side-content" :collapse="isMenuAsideCollapse" :unique-opened="true" :default-active="active" ref="menu" @select="handleMenuSelect">
      <template v-for="(menu, menuIndex) in menuAside">
        <menu-item v-if="menu.children === undefined" :menu="menu" :key="menuIndex" />
        <menu-sub v-else :menu="menu" :key="menuIndex" />
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mixin from '@/views/layout/mixin'
import MenuSub from '@/components/menuSub'
import MenuItem from '@/components/menuItem'
export default {
  name: 'menu-side',
  mixins: [mixin],
  components: {
    MenuSub,
    MenuItem
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
    ...mapActions(['appSetAsideCollapse'])
  }
}
</script>
