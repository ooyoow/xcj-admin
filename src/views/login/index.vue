<template>
  <div
    ref="appLogin"
    class="app-login-frame"
    @keyup.enter.native="handleLogin"
  >
    <canvas ref="bubble"></canvas>
    <div class="login-container">
      <div class="app-name">无人值守洗车业务管理系统</div>
      <div class="login-main">
        <user-login></user-login>
        <!-- <el-tabs :stretch="true" v-model="activeName">
          <el-tab-pane label="用户密码" name="user">
            <user-login></user-login>
          </el-tab-pane>
          <el-tab-pane label="短信验证码" name="code">
            <mobile-login></mobile-login>
          </el-tab-pane>
        </el-tabs> -->
      </div>
    </div>
  </div>
</template>
<script>
import userLogin from "./userLogin";
import mobileLogin from "./mobileLogin";
import "./login.scss";
export default {
  name: "login",
  components: {
    userLogin,
    mobileLogin
  },
  data() {
    return {
      activeName: "user",
      width: 0,
      height: 0,
      largeHeader: "",
      canvas: "",
      ctx: "",
      circles: [],
      target: "",
      animateHeader: true
    };
  },
  mounted() {
    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }

    // Main
    this.initRequestAnimationFrame();
    this.initHeader();
    this.addListeners();
  },
  methods: {
    initHeader() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.target = { x: 0, y: this.height };
      this.largeHeader = this.$refs["appLogin"];
      this.$refs["appLogin"].style.height = this.height + "px";

      this.canvas = this.$refs["bubble"]; // document.getElementById("bubble");
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx = this.canvas.getContext("2d");

      // create particles
      this.circles = [];
      for (let x = 0; x < this.width * 0.5; x++) {
        this.circles.push(this.circle());
      }
      this.animate();
    },

    // Event handling
    addListeners() {
      window.addEventListener("resize", this.resize);
      window.addEventListener("scroll", this.scrollCheck);
    },

    scrollCheck() {
      if (document.body.scrollTop > this.height) {
        this.animateHeader = false;
      } else {
        this.animateHeader = true;
      }
    },

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.largeHeader.style.height = this.height + "px";
    },

    animate() {
      if (this.animateHeader) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i in this.circles) {
          this.draw(this.circles[i]);
        }
      }
      requestAnimationFrame(this.animate);
    },

    // Canvas manipulation
    circle() {
      // 初始化圆
      return {
        x: Math.random() * this.width,
        y: this.height + Math.random() * 100,
        alpha: 0.1 + Math.random() * 0.3,
        scale: 0.3 + Math.random() * 0.3,
        velocity: Math.random()
      };
    },

    draw(props) {
      let pos = props;
      if (pos.alpha <= 0) {
        Object.assign(pos, this.circle());
      }
      pos.y -= pos.velocity;
      pos.alpha -= 0.0005;
      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, pos.scale * 10, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = `rgba(255,255,255,${pos.alpha})`;
      this.ctx.fill();
    },

    initRequestAnimationFrame() {
      const vendors = ["ms", "moz", "webkit", "o"];
      let lastTime = 0;
      for (
        var x = 0;
        x < vendors.length && !window.requestAnimationFrame;
        ++x
      ) {
        window.requestAnimationFrame =
          window[`${vendors[x]}RequestAnimationFrame`];
        window.cancelAnimationFrame =
          window[`${vendors[x]}CancelAnimationFrame`] ||
          window[`${vendors[x]}CancelRequestAnimationFrame`];
      }

      if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
          const currTime = new Date().getTime();
          const timeToCall = Math.max(0, 16 - (currTime - lastTime));
          const id = window.setTimeout(function() {
            callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };

      if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
        };
    }
  }
};
</script>