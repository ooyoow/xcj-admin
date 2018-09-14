<template>
  <div class="tabs">
    <div class="tabs-content" flex-box="1">
      <div class="tabs-content-inner">
        <content-menu :visible.sync="contentmenuFlag" :x="contentmenuX" :y="contentmenuY">
          <content-menu-list :menulist="tagName === 'index' ? contentmenuListIndex : contentmenuList" @rowClick="contentmenuClick" />
        </content-menu>
        <el-tabs class="page-control" :value="current" type="card" :closable="true" @tab-click="handleClick" @edit="handleTabsEdit" @contentmenu.native="handlecontentmenu">
          <el-tab-pane v-for="(page, index) in opened" :key="index" :label="page.meta.title || '未命名'" :name="page.name" />
        </el-tabs>
      </div>
    </div>
    <div class="page-control-btn" flex-box="0">
      <el-tooltip class="item" effect="dark" content="关闭所有" placement="bottom">
        <el-button type="primary" icon="el-icon-circle-close-outline" @click="handleControlItemClick('all')"></el-button>
      </el-tooltip>
      <!-- <el-dropdown split-button @click="handleControlBtnClick" @command="command => handleControlItemClick(command)">
        <icon name="times-circle" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="left">
            <icon name="arrow-left" class="d2-mr-10" /> 关闭左侧
          </el-dropdown-item>
          <el-dropdown-item command="right">
            <icon name="arrow-right" class="d2-mr-10" /> 关闭右侧
          </el-dropdown-item>
          <el-dropdown-item command="other">
            <icon name="times" class="d2-mr-10" /> 关闭其它
          </el-dropdown-item>
          <el-dropdown-item command="all">
            <icon name="times-circle" class="d2-mr-10" /> 全部关闭
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    ContentMenu: () => import('./ContentMenu'),
    ContentMenuList: () => import('./ContentMenuList')
  },
  data() {
    return {
      contentmenuFlag: false,
      contentmenuX: 0,
      contentmenuY: 0,
      contentmenuListIndex: [{ icon: 'times-circle', title: '关闭全部', value: 'all' }],
      contentmenuList: [{ icon: 'times-circle', title: '关闭全部', value: 'all' }],
      tagName: 'index'
    }
  },
  computed: {
    ...mapState({
      opened: state => state.page.opened,
      current: state => state.page.current
    })
  },
  methods: {
    ...mapActions(['closePage', 'closeAllPage']),

    // 右键菜单功能点击
    handlecontentmenu(event) {
      let target = event.target
      let flag = false
      if (target.className.indexOf('el-tabs__item') > -1) flag = true
      else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = target.parentNode
        flag = true
      }

      if (flag) {
        event.preventDefault()
        event.stopPropagation()
        this.contentmenuX = event.clientX
        this.contentmenuY = event.clientY
        this.tagName = target.getAttribute('aria-controls').slice(5)
        this.contentmenuFlag = true
      }
    },
    // 右键菜单的row-click事件
    contentmenuClick(command) {
      this.handleControlItemClick(command, this.tagName)
    },
    // 接收点击关闭控制上选项的事件
    handleControlItemClick(command, tagName = null) {
      if (tagName) {
        this.contentmenuFlag = false
      }
      const params = {
        pageSelect: tagName,
        vm: this
      }
      switch (command) {
        case 'left':
          this.closeLeft(params)
          break
        case 'right':
          this.closeRight(params)
          break
        case 'other':
          this.closeOther(params)
          break
        case 'all':
          this.closeAllPage(this)
          break
        default:
          this.$message.error('无效的操作')
          break
      }
    },

    // 接收点击关闭控制上按钮的事件
    handleControlBtnClick() {
      this.closeAllPage(this)
    },

    // 接收点击 tab 标签的事件
    handleClick(tab, event) {
      const page = this.opened.find(page => page.name === tab.name) // 找到点击的页面在 tag 列表里是哪个
      const { name, params, query } = page
      if (page) this.$router.push({ name, params, query })
    },

    // 点击 tab 上的删除按钮触发这里 首页的删除按钮已经隐藏 因此这里不用判断是 index
    handleTabsEdit(tagName, action) {
      if (action === 'remove') {
        this.close({
          tagName,
          vm: this
        })
      }
    }
  }
}
</script>
