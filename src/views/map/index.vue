<template>
  <div :class="prefixCls">
    <baidu-map
      :class="[`${prefixCls}-content`]"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
    >
      <bm-marker
        :key="key"
        v-for="(store, key) in storeList"
        :position="{lng: store.storeLocationX, lat: store.storeLocationY}"
        :icon="{url: './src/assets/images/point.png', size: {width: 32, height: 32}}"
      >
        <overlay :position="{lng: store.storeLocationX, lat: store.storeLocationY}">
          <!-- <div class="tips-box">
            <div>
              <div class="servie-amount">{{store.servieAmount||0}}元</div>
              <div class="bar"></div>
              <div class="wash-amount">{{store.washAmount||0}}辆</div>
            </div>
            <div class="store-logo"><img :src="store.storeImg" /></div>
            <div class="store-name">{{store.storeName}}</div>
          </div> -->
          <div>{{store.storeName}}</div>
          <div class="tips-box">
            <div class="item">
              <div class="wash-amount">{{store.washAmount||0}}辆</div>
              <div class="type">洗车量</div>
            </div>
            <div class="item">
              <div class="servie-amount">￥{{store.servieAmount||0}}</div>
              <div class="type">服务额</div>
            </div>
          </div>
        </overlay>
        <bm-geolocation
          :showAddressBar="true"
          :autoLocation="true"
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        ></bm-geolocation>
      </bm-marker>
    </baidu-map>
    <div :class="[`${prefixCls}-actions`]">
      <el-radio-group
        v-model="type"
        @change="onRadioChange"
      >
        <el-radio-button :label="1">本日</el-radio-button>
        <el-radio-button :label="2">本周</el-radio-button>
        <el-radio-button :label="0">本月</el-radio-button>
      </el-radio-group>
      <el-button
        type="primary"
        size="mini"
        @click="handleBtnStore"
      >{{showStore ? '隐藏' : '门店' }}列表</el-button>
    </div>
    <div
      v-show="showStore"
      :class="[`${prefixCls}-store`]"
    >
      <ul
        :key="key"
        v-for="(store, key) in storeList"
      >
        <li
          :class="[`${prefixCls}-store-item`]"
          @click="handleStoreDetail(store)"
        >
          <div>
            <span class="store-name">{{store.storeName}}</span>
            <span class="store-number">{{store.storeId}}</span>
            <el-tag :type="storeState[store.state]">{{store.stateName}}</el-tag>
          </div>
          <div>
            <span class="servie-amount"><span>{{store.servieAmount||0}}</span> 元</span>
            <span class="wash-amount"><span>{{store.washAmount||0}}</span> 辆</span>
            <span>{{store.driverid}}</span>
          </div>
          <div class="store-address">{{`${store.storePro||""}${store.storeCity||""}${store.address||""}`}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Overlay from "./overlay";
import "./style.scss";
export default {
  data() {
    return {
      prefixCls: "xcj-map",
      center: { lng: 110.301309, lat: 20.016001 }, // 丘海大道19号
      zoom: 18,
      show: true,
      showStore: false,
      active: true,
      type: 2,
      storeState: {
        business: "success",
        suspend: "warning",
        build: "info"
      }
    };
  },
  components: {
    Overlay
  },
  mounted() {
    this.getStore(2);
  },
  computed: {
    ...mapState({
      storeList: state => state.map.storeList
    })
  },
  methods: {
    ...mapActions(["getStore"]),
    onRadioChange(value) {
      this.getStore(+value);
    },

    handleBtnStore() {
      this.showStore = !this.showStore;
    },
    handleStoreDetail(data) {
      const { storeLocationX, storeLocationY } = data;
      if (storeLocationX && storeLocationY) {
        this.center = {
          lng: storeLocationX,
          lat: storeLocationY
        };
        return;
      }
      this.$message.error("该门店未添加经纬度信息，补全即可定位");
    }
  }
};
</script>
