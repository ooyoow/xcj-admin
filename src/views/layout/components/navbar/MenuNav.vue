<template>
  <el-menu mode="horizontal" :default-active="active" @select="handleMenuSelect">
    <template v-for="(menu, menuIndex) in menuHeader">
      <menu-item v-if="menu.children === undefined" :menu="menu" :key="menuIndex" />
      <menu-sub v-else :menu="menu" :key="menuIndex" />
    </template>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import menuMixin from '../../mixin'
import MenuSub from '@/components/menuSub'
import MenuItem from '@/components/menuItem'
export default {
  name: 'MenuNav',
  mixins: [menuMixin],
  components: {
    MenuSub,
    MenuItem
  },
  computed: {
    ...mapState({ menuHeader: state => state.app.menuHeader })
  },
  data() {
    return {
      active: ''
    }
  },
  watch: {
    '$route.matched': {
      handler(val) {
        this.active = val[val.length - 1].path
      },
      immediate: true
    }
  }
}
</script>
