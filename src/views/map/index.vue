<template>
  <div :class="prefixCls">
    <baidu-map :class="[`${prefixCls}-content`]" :center="center" :zoom="zoom" :scroll-wheel-zoom="true">
      <bm-marker :key="key" v-for="(store, key) in storeList" :position="{lng: store.storeLocationX, lat: store.storeLocationY}" @click="handleMarker">
        <overlay :position="{lng: store.storeLocationX, lat: store.storeLocationY}" @mouseover.native="active = true" @mouseleave.native="active = false">
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
      </bm-marker>
    </baidu-map>
    <div :class="[`${prefixCls}-actions`]">
      <el-radio-group v-model="type" @change="onRadioChange">
        <el-radio-button label="1">本日</el-radio-button>
        <el-radio-button label="2">本周</el-radio-button>
        <el-radio-button label="3">本月</el-radio-button>
      </el-radio-group>
      <el-button type="primary" size="mini" @click="handleBtnStore">{{showStore ? '隐藏' : '门店' }}列表</el-button>
    </div>
    <div v-show="showStore" :class="[`${prefixCls}-store`]">
      <ul :key="key" v-for="(store, key) in storeList">
        <li :class="[`${prefixCls}-store-item`]">
          <div class="store-name">{{`${key + 1}. ${store.storeName}`}}</div>
          <div class="servie-amount">服务额：
            <span>{{store.servieAmount||0}}</span> 元</div>
          <div class="wash-amount">洗车量：
            <span>{{store.washAmount||0}}</span> 辆</div>
          <div class="store-address">{{`${store.storePro}${store.storeCity}${store.address}`}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Overlay from './overlay'
import './style.scss'
export default {
  data() {
    return {
      prefixCls: 'cw-map',
      center: { lng: 110.301309, lat: 20.016001 }, // 丘海大道19号
      zoom: 18,
      show: true,
      showStore: false,
      active: true,
      type: '1'
      // storeList: [
      //   {
      //     storeName: '海口丘海店海口丘海店海口丘海店',
      //     storeLocationX: 110.301309,
      //     storeLocationY: 20.016001
      //   }
      // ]
    }
  },
  components: {
    Overlay
  },
  mounted() {
    this.getStore(1)
  },
  computed: {
    ...mapState({
      storeList: state => state.map.storeList
    })
  },
  methods: {
    ...mapActions(['getStore']),
    onRadioChange(value) {
      this.getStore(+value)
    },
    handleBtnStore() {
      this.showStore = !this.showStore
    },
    handleMarker() {}
  }
}
</script>
