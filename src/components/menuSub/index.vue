<template>
  <el-submenu :index="menu.path || uniqueid">
    <template slot="title">
      <i :class="`${menu.meta.icon || 'el-icon-folder'}`"></i>
      <span slot="title">{{menu.meta.title}}</span>
    </template>
    <template v-for="(child, childIndex) in menu.children">
      <menu-item-aside v-if="child.children === undefined" :menu="child" :key="childIndex" />
      <menu-sub-aside v-else :menu="child" :key="childIndex" />
    </template>
  </el-submenu>
</template>

<script>
import uniqueid from "lodash.uniqueid";
import menuItemAside from "@/components/menuItem";

export default {
  name: "menuSubAside",
  components: {
    menuItemAside
  },
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      uniqueid: uniqueid("menu-empty-")
    };
  }
};
</script>