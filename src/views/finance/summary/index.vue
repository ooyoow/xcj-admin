<template>
  <div :class="prefixCls">
    <div class="filter-container">
      <el-button
        type="primary"
        icon="el-icon-download"
        @click="handleExport"
      >导出数据</el-button>
      <el-radio-group
        v-model="type"
        @change="handleFilterRadioGroup"
      >
        <el-radio-button :label="1">全部</el-radio-button>
        <el-radio-button :label="2">最近30天</el-radio-button>
        <el-radio-button :label="3">最近90天</el-radio-button>
      </el-radio-group>
      <el-date-picker
        v-model="date"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        @input="handleFilterDate"
      ></el-date-picker>
    </div>
    <div class="stats-item">
      <div class="category">关键指标</div>
      <el-table
        :data="keyFigures"
        border
      >
        <el-table-column
          prop="washAmount"
          label="洗车总量"
          align="center"
        />
        <el-table-column
          prop="serveAmount"
          label="服务总额"
          align="center"
        />
        <el-table-column
          prop="salesAmount"
          label="销售总额"
          align="center"
        />
        <el-table-column
          prop="actualSalesAmount"
          label="到账服务总额"
          align="center"
        />
        <el-table-column
          prop="unActualSalesAmount"
          label="未分到账服务总额"
          align="center"
        />
      </el-table>
    </div>
    <div class="stats-item">
      <div class="category">大类销量统计</div>
      <el-table
        :data="bigSales"
        border
      >
        <el-table-column
          prop="packageAmount"
          label="套餐销售总额"
          align="center"
        />
        <el-table-column
          prop="limitCardAmount"
          label="限次卡销售总额"
          align="center"
        />
        <el-table-column
          prop="couponGiveAmount"
          label="优惠券赠送总额"
          align="center"
        />
        <el-table-column
          prop="couponSalesAmount"
          label="优惠券销售总额"
          align="center"
        />
      </el-table>
    </div>
    <div class="stats-item">
      <div class="category">产品销量统计</div>
      <el-table
        :data="productSales"
        border
      >
        <el-table-column
          prop="pName"
          label="产品名称"
          align="center"
        />
        <el-table-column
          prop="saleCount"
          label="销量"
          align="center"
        />
      </el-table>
    </div>
    <div class="stats-item">
      <div class="category">门店服务额统计</div>
      <el-table
        :data="storeService"
        border
      >
        <el-table-column
          prop="storeName"
          label="门店名称"
          align="center"
        />
        <el-table-column
          prop="washAmount"
          label="洗车量"
          align="center"
        />
        <el-table-column
          prop="servieAmount"
          label="服务额"
          align="center"
        />
      </el-table>
    </div>
    <div class="stats-item">
      <div class="category">所有者分润统计</div>
      <el-table
        :data="ownerProfit"
        border
      >
        <el-table-column
          prop="ownerName"
          label="所有者"
          align="center"
        />
        <el-table-column
          prop="storeName"
          label="门店"
          align="center"
        />
        <el-table-column
          prop="realAmount"
          label="到账服务总额"
          align="center"
        />
        <el-table-column
          prop="shareAmount"
          label="分润额"
          align="center"
        />
        <el-table-column
          prop="rate"
          label="分润比例"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.rate}}%</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="stats-item">
      <div class="category">订单统计</div>
      <el-table
        :data="orderStats"
        border
      >
        <el-table-column
          prop="saleOrderCount"
          label="销售订单总数"
          align="center"
        />
        <el-table-column
          prop="unServerOrderCount"
          label="待服务订单总数"
          align="center"
        />
        <el-table-column
          prop="unServerOrderAmount"
          label="待服务订单总额"
          align="center"
        />
        <el-table-column
          prop="unPaidOrderCount"
          label="待付款订单总数"
          align="center"
        />
        <el-table-column
          prop="unPaidOrderAmount"
          label="待付款订单总额"
          align="center"
        />
        <el-table-column
          prop="refundOrderCount"
          label="退款订单总数"
          align="center"
        />
        <el-table-column
          prop="name"
          label="退款订单总额"
          align="center"
        />
        <el-table-column
          prop="couponGiveCount"
          label="优惠劵赠送总数"
          align="center"
        />
        <el-table-column
          prop="couponSaleAmount"
          label="优惠劵销售总数"
          align="center"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
import $axios from '@/utils/axios'
import './summary.scss'
import { expandParams } from '@/utils/general'
const appConfig = require('../../../../config/app')

export default {
  name: 'Summary',
  data() {
    return {
      prefixCls: 'xcj-finance-summary',
      type: 1,
      date: '',
      keyFigures: [], // 关键指标
      bigSales: [], // 大类销量统计
      productSales: [], // 产品销量统计
      storeService: [], // 门店服务额统计
      ownerProfit: [], // 所有者分润统计
      orderStats: [] // 订单统计
    }
  },
  created() {
    this.getPageData({ type: this.type })
  },
  methods: {
    handleFilterRadioGroup(val) {
      this.getPageData({ type: this.type })
    },
    handleFilterDate(val) {
      this.type = 4
      this.getPageData({
        type: this.type,
        start: val[0],
        end: val[1]
      })
    },

    //导出数据
    handleExport() {
      const params = {}
      switch (this.type) {
        case 1:
        case 2:
        case 3:
          window.open(`${appConfig.baseUrl}/api/v1/finance/exportGeneral?type=${this.type}`)
          break
        case 4:
          const params = {
            type: this.type,
            start: this.date[0],
            end: this.date[1]
          }
          window.open(`${appConfig.baseUrl}/api/v1/finance/exportGeneral${expandParams(params)}`)
          break
      }
    },

    // 查询关键指标
    getKeyFigures(params) {
      $axios({
        url: '/api/v1/finance/keyFigures',
        method: 'get',
        params: params
      }).then(response => {
        const { resultObj, totalSize } = response
        this.keyFigures = resultObj ? new Array(resultObj) : []
      })
    },
    // 查询大类销售统计
    getBigSales(params) {
      $axios({
        url: '/api/v1/finance/salesStatistics',
        method: 'get',
        params: params
      }).then(response => {
        const { resultObj } = response
        this.bigSales = resultObj ? new Array(resultObj) : []
      })
    },
    // 查询产品销量统计
    getProductSales(params) {
      $axios({
        url: '/api/v1/finance/productSales',
        method: 'get',
        params: params
      }).then(response => {
        this.productSales = response.resultObj
      })
    },
    // 门店服务额统计
    getStoreServiceAmount(params) {
      $axios({
        url: '/api/v1/finance/storeServiceStatistics',
        method: 'get',
        params: params
      }).then(response => {
        this.storeService = response.resultObj
      })
    },
    // 所有者分润统计
    getOwnerProfitStats(params) {
      $axios({
        url: '/api/v1/finance/profitStatistics',
        method: 'get',
        params: params
      }).then(response => {
        this.ownerProfit = response.resultObj
      })
    },
    // 查询订单统计
    getOrderStats(params) {
      $axios({
        url: '/api/v1/finance/orderStatistics',
        method: 'get',
        params: params
      }).then(response => {
        const { resultObj } = response
        this.orderStats = resultObj ? new Array(resultObj) : []
      })
    },
    // 查询所有统计
    getPageData(params) {
      this.getKeyFigures(params)
      this.getBigSales(params)
      this.getProductSales(params)
      this.getStoreServiceAmount(params)
      this.getOwnerProfitStats(params)
      this.getOrderStats(params)
    }
  }
}
</script>

