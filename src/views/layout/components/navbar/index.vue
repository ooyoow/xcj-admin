<template>
  <section>
    <nav class="navbar">
      <div class="navbar-brand">
        <div class="logo">福瑞道</div>
      </div>
      <div class="navbar-menu">
        <menu-nav class="navbar-start"></menu-nav>
        <ul class="navbar-end">
          <li class="navbar-item">
            <el-tooltip effect="dark" :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
              <el-button class="btn-text can-hover" type="text" @click="appToggleFullScreen">
                <i class="el-icon-rank" style="font-size: 1.25rem"></i>
              </el-button>
            </el-tooltip>
          </li>
          <li class="navbar-item">
            <el-tooltip effect="dark" content="通知" placement="bottom">
              <el-button class="btn-text can-hover" type="text">
                <i class="el-icon-bell" style="font-size: 1.25rem"></i>
              </el-button>
            </el-tooltip>
          </li>
          <li class="navbar-item">
            <el-dropdown>
              <el-button class="btn-text can-hover" type="text">
                <i class="el-icon-menu" style="font-size: 1.25rem"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="theme in themeList" :key="theme.key" @click.native="setTheme(theme.key)">
                  {{theme.name}}
                </el-dropdown-item>
                <!-- <el-dropdown-item>
                <theme-picker class="theme-switch right-menu-item"></theme-picker>
              </el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="navbar-item">
            <el-dropdown>
              <div>
                <img class="img-user" src="@/assets/images/user.png" alt="用户">
                <span class="btn-text">{{userInfo.name}}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleChangePassword">
                  <i class="el-icon-key"></i>&nbsp;修改密码
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleLogout">
                  <i class="el-icon-logout"></i>&nbsp;注销
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </nav>
    <change-password :show="showChangePassword" :onSubmit="handleSubmitPassword" :onCancel="cancelChangePassword" />
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { MessageBox } from "element-ui";
import MenuNav from "./MenuNav";
import ChangePassword from "./ChangePassword";
export default {
  name: "aside-menu",
  components: { MenuNav, ChangePassword },
  data() {
    return {
      showChangePassword: false
    };
  },
  computed: {
    ...mapState({
      isFullScreen: state => state.app.isFullScreen,
      menuHeader: state => state.app.menuHeader,
      userInfo: state => state.login.userInfo,
      themeList: state => state.theme.themeList
    })
  },
  methods: {
    ...mapActions([
      "appToggleFullScreen",
      "logout",
      "setTheme",
      "changePassword"
    ]),
    handleTheme(key) {
      this.setTheme(key);
    },
    handleLogout() {
      if (confirm) {
        const callback = () => {
          this.$router.push({ path: "/login" });
        };
        MessageBox.confirm("确定注销当前账户吗?", "确认操作", {
          confirmButtonText: "确定注销",
          cancelButtonText: "放弃",
          type: "warning"
        })
          .then(() => {
            this.logout(callback);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    handleChangePassword() {
      this.showChangePassword = true;
    },
    handleSubmitPassword(data, callback) {
      const { adminId, loginId } = this.userInfo;
      const params = {
        ...data,
        adminId,
        loginId
      };
      this.changePassword({
        params,
        callback: () => {
          this.$router.push({ path: "/login" });
          callback();
        }
      });
    },
    cancelChangePassword() {
      this.showChangePassword = false;
    }
  }
};
</script>

