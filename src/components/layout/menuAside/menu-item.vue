<template>
  <el-menu-item :index="menu.path || uniqueid">
    <i :class="`fa fa-${menu.icon || 'file-o'}`"></i>
    <span slot="title">{{menu.meta.title || '未命名菜单'}}</span>
  </el-menu-item>
</template>

<script>
import uniqueid from 'lodash.uniqueid'
export default {
  name: 'menuItemAside',
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      uniqueid: uniqueid('menu-empty-')
    }
  }
}
</script>
