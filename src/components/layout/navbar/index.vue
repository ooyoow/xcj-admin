<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <div class="navbar-item">
        App name
      </div>
    </div>
    <div class="navbar-menu">
      <ul class="navbar-start">
        <li class="navbar-item" v-for="menu in menuHeader" :key="menu.path" @click="handleMenuSelect(menu.path)">
          {{menu.meta.title}}
        </li>
      </ul>
      <ul class="navbar-end">
        <li class="navbar-item">
          <el-tooltip effect="dark" :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
            <el-button class="btn-text can-hover" type="text" @click="appToggleFullScreen">
              <icon v-if="isFullScreen" name="compress" />
              <icon v-else name="arrows-alt" style="font-size: 16px" />
            </el-button>
          </el-tooltip>
        </li>
        <li class="navbar-item">
          <el-button class="btn-text can-hover" type="text">
            <icon name="bell-o" style="font-size: 1rem" />
          </el-button>
        </li>
        <li class="navbar-item">
          <el-tooltip effect="dark" content="主题" placement="bottom">
            <el-button class="btn-text can-hover" type="text" @click="dialogVisible = true">
              <icon name="delicious" style="font-size: 16px" />
            </el-button>
          </el-tooltip>
        </li>
        <li class="navbar-item">
          <el-dropdown>
            <div>
              <img class="img-user" src="@/assets/images/user.png" alt="用户">
              <!-- <icon name="user-o" style="font-size: 16px" /> -->
              <span class="btn-text">{{userInfo.name}}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logOff">
                <icon name="power-off" />注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import './navbar.scss'
import { mapState, mapActions } from 'vuex'
import mixin from '../mixin'
export default {
  name: 'aside-menu',
  data() {
    return {}
  },
  mixins: [mixin],
  props: {
    show: { type: Boolean, default: false }
  },
  computed: {
    ...mapState({
      isFullScreen: state => state.app.isFullScreen,
      menuHeader: state => state.app.menuHeader,
      userInfo: state => state.app.userInfo
    })
  },
  methods: {
    ...mapActions(['appToggleFullScreen', 'logout']),
    logOff() {
      const callback = () => {
        this.$router.push({ path: '/login' })
      }
      this.logout({
        confirm: true,
        callback: callback
      })
    }
  }
}
</script>

