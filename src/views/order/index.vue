<template>
  <div class="overview xcj-order">
    <el-row class="group-card" :gutter="12">
      <el-col :span="6">
        <el-card shadow="always">
          <div class="order-overview">
            <div class="icon">
              <icon name="list" />
            </div>
            <div class=" content">
              <div class="title ">订单（笔）</div>
              <div class="today">今日
                <span>{{orderInfo.todayPayRecd||0}}</span>
              </div>
              <div class="yesterday">昨日
                <span>{{orderInfo.yesterdayPayRecd||0}}</span>
              </div>
              <div class="seven-days">近7天
                <span>{{orderInfo.last7DayPayRecd||0}}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="order-overview">
            <div class="icon">
              <icon name="list" />
            </div>
            <div class=" content">
              <div class="title">洗车量（辆）</div>
              <div class="today">今日
                <span>{{orderInfo.todayWash||0}}</span>
              </div>
              <div class="yesterday">昨日
                <span>{{orderInfo.yesterdayWash||0}}</span>
              </div>
              <div class="seven-days">近7天
                <span>{{orderInfo.last7DayWash||0}}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="order-overview">
            <div class="icon">
              <icon name="list" />
            </div>
            <div class="content">
              <div class="title">销售额（元）</div>
              <div class="today">今日
                <span>{{orderInfo.salesToday||0}}</span>
              </div>
              <div class="yesterday">昨日
                <span>{{orderInfo.salesYesterday||0}}</span>
              </div>
              <div class="seven-days">近7天
                <span>{{orderInfo.salesLast7Day||0}}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6 ">
        <el-card shadow="always">
          <div class="order-overview">
            <div class="icon">
              <icon name="list" />
            </div>
            <div class="content">
              <div class="title">服务额（元）</div>
              <div class="today">今日
                <span>{{orderInfo.serveToday||0}}</span>
              </div>
              <div class="yesterday">昨日
                <span>{{orderInfo.serveYesterday||0}}</span>
              </div>
              <div class="seven-days">近7天
                <span>{{orderInfo.serveLast7Day||0}}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div class="header">订单总览</div>
        <div style="margin-bottom:50px;">
          <el-col :span="6">
            <div class="order-data">
              <div>已付款订单</div>
              <div>
                <el-popover placement="right" trigger="hover" @show="loadOrderDetail('paidOrder')">
                  <el-table :data="paidOrderList">
                    <el-table-column align="center" property="userName" label="用户" />
                    <el-table-column align="center" width="100" property="carNo" label="车牌" />
                    <el-table-column align="center" property="pname" label="产品名称" />
                    <el-table-column align="center" property="marketPrice" label="市场价" />
                    <el-table-column align="center" property="payMoney" label="售价" />
                    <el-table-column align="center" width="150" property="payTime" label="下单时间" :formatter="formatTime" />
                  </el-table>
                  <span slot="reference" class="number">{{orderView.paidOrder||0}}</span>
                </el-popover>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="order-data">
              <div>待付款订单</div>
              <div>
                <el-popover placement="right" trigger="hover" @show="loadOrderDetail('unpaymentOrder')">
                  <el-table :data="unpaymentOrderList">
                    <el-table-column align="center" property="userName" label="用户" />
                    <el-table-column align="center" width="100" property="carNo" label="车牌" />
                    <el-table-column align="center" property="pname" label="产品名称" />
                    <el-table-column align="center" property="marketPrice" label="市场价" />
                    <el-table-column align="center" property="payMoney" label="售价" />
                    <el-table-column align="center" width="150" property="payTime" label="下单时间" :formatter="formatTime" />
                  </el-table>
                  <span class="number" slot="reference">{{orderView.unpaymentOrder||0}}</span>
                </el-popover>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="order-data">
              <div>服务订单</div>
              <div>
                <el-popover placement="right" trigger="hover" @show="loadOrderDetail('completedOrder')">
                  <el-table :data="completedOrderList">
                    <el-table-column align="center" property="userName" label="用户" />
                    <el-table-column align="center" width="100" property="carNo" label="车牌" />
                    <el-table-column align="center" property="pname" label="产品名称" />
                    <el-table-column align="center" property="marketPrice" label="市场价" />
                    <el-table-column align="center" property="payMoney" label="售价" />
                    <el-table-column align="center" property="storeName" label="洗车门店" />
                    <el-table-column align="center" width="150" property="usetime" label="洗车时间" :formatter="formatTime" />
                  </el-table>
                  <span slot="reference" class="number">{{orderView.completedOrder||0}}</span>
                </el-popover>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="order-data">
              <div>已取消订单</div>
              <div>
                <el-popover placement="right" trigger="hover" @show="loadOrderDetail('refundedOrder')">
                  <el-table :data="cancelledOrderList">
                    <el-table-column property="userName" label="用户" />
                    <el-table-column property="carNo" label="车牌" />
                    <el-table-column property="pname" label="产品名称" />
                    <el-table-column property="marketPrice" label="市场价" />
                    <el-table-column property="payMoney" label="售价" />
                    <el-table-column property="cancelTime" label="取消时间" :formatter="formatTime" />
                  </el-table>
                  <span class="number" slot="reference">{{orderView.refundedOrder||0}}</span>
                </el-popover>
              </div>
            </div>
          </el-col>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div class="header">用户总览</div>
        <div class="content" style="margin-bottom:20px;">
          <el-col :span="8">
            <div class="user-data">
              <div class="number">{{memberInfo.todayCount}}</div>
              <div class="type">今日新增</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="user-data">
              <div class="number">{{memberInfo.allCount}}</div>
              <div class="type">会员总数</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="user-data">
              <div class="number">{{memberInfo.continuedUser}}</div>
              <div class="type">续卡会员</div>
            </div>
          </el-col>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div class="header">产品实时销量</div>
        <div class="product-sales">
          <div class="actions">
            <el-radio-group v-model="productSalesType" @change="getProductSales">
              <el-radio-button :label="1">套餐卡</el-radio-button>
              <el-radio-button :label="2">次卡</el-radio-button>
              <el-radio-button :label="3">优惠券</el-radio-button>
            </el-radio-group>
          </div>
          <bar height='300px' width='100%' :option="productSalesChartOption" />
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div class="header">订单统计</div>
        <div class="data-stats">
          <div class="aside">
            <aside-card title="本月订单总数" :count="orderStats.presentMonth" trend="up" :trendRatio="orderStats.ratioMonth" compareName="同比上月"></aside-card>
            <aside-card title="本周订单数量" :count="orderStats.presentWeek" trend="up" :trendRatio="orderStats.ratioWeek" compareName="同比上周"></aside-card>
          </div>
          <div class="chart">
            <stats class="bar" title="近一周销售统计" :onRadioChange="onOrderRadioChange" :onDateChange="onOrderDateChange"></stats>
            <line-chart height='300px' width='100%' :xAxisData="orderStats.xAxisData" :seriesData="orderStats.seriesData"></line-chart>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div class="header">销售统计</div>
        <div class="data-stats">
          <div class="aside">
            <aside-card title="本月销售总额" :count="salesStats.presentMonth" trend="up" :trendRatio="salesStats.ratioMonth" compareName="同比上月"></aside-card>
            <aside-card title="本周销售总额" :count="salesStats.presentWeek" trend="up" :trendRatio="salesStats.ratioWeek" compareName="同比上周"></aside-card>
          </div>
          <div class="chart">
            <stats class="bar" title="销售统计" :onRadioChange="onSalesRadioChange" :onDateChange="onSalesDateChange"></stats>
            <line-chart height='300px' width='100%' :xAxisData="salesStats.xAxisData" :seriesData="salesStats.seriesData"></line-chart>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div class="header">洗车量统计</div>
        <el-form class="search-form" :inline="true" :model="formWashSearch">
          <el-form-item label="所有者">
            <el-select v-model="formWashSearch.organizationId" placeholder="请选择所有者" @change="onOrgOptionChange('wash', formWashSearch.organizationId)">
              <el-option v-for="item in orgOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门店">
            <el-select v-model="formWashSearch.storeId" placeholder="请选择门店">
              <el-option v-for="item in formWashSearch.storeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="data-stats">
          <div class="aside">
            <aside-card title="本月洗车总量" :count="washStats.presentMonth" trend="up" :trendRatio="washStats.ratioMonth" compareName="同比上月"></aside-card>
            <aside-card title="本周洗车总量" :count="washStats.presentWeek" trend="up" :trendRatio="washStats.ratioWeek" compareName="同比上周"></aside-card>
          </div>
          <div class="chart">
            <stats class="bar" title="洗车量统计" :onRadioChange="onWashRadioChange" :onDateChange="onWashDateChange"></stats>
            <line-chart height='300px' width='100%' :xAxisData="washStats.xAxisData" :seriesData="washStats.seriesData"></line-chart>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div class="header">服务额统计</div>
        <el-form class="search-form" :inline="true" :model="formServiceSearch">
          <el-form-item label="所有者">
            <el-select v-model="formServiceSearch.organizationId" placeholder="请选择所有者" @change="onOrgOptionChange('service', formServiceSearch.organizationId)">
              <el-option v-for="item in orgOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门店">
            <el-select v-model="formServiceSearch.storeId" placeholder="请选择门店">
              <el-option v-for="item in formServiceSearch.storeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="data-stats">
          <div class="aside">
            <aside-card title="本月服务额" :count="serviceStats.presentMonth" trend="up" :trendRatio="serviceStats.ratioMonth" compareName="同比上月"></aside-card>
            <aside-card title="本周服务额" :count="serviceStats.presentWeek" trend="up" :trendRatio="serviceStats.ratioWeek" compareName="同比上周"></aside-card>
          </div>
          <div class="chart">
            <stats class="bar" title="服务额统计" :onRadioChange="onServiceRadioChange" :onDateChange="onServiceDateChange"></stats>
            <line-chart height='300px' width='100%' :xAxisData="serviceStats.xAxisData" :seriesData="serviceStats.seriesData"></line-chart>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div class="header">分润统计</div>
        <el-form class="search-form" :inline="true" :model="formProfitSearch">
          <el-form-item label="所有者">
            <el-select v-model="formProfitSearch.organizationId" placeholder="请选择所有者" @change="onOrgOptionChange('profit', formProfitSearch.organizationId)">
              <el-option v-for="item in orgOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门店">
            <el-select v-model="formProfitSearch.storeId" placeholder="请选择门店">
              <el-option v-for="item in formProfitSearch.storeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="data-stats">
          <div class="aside">
            <aside-card title="本月分润额" :count="profitStats.presentMonth" trend="up" :trendRatio="profitStats.ratioMonth" compareName="同比上月"></aside-card>
            <aside-card title="本周分润额" :count="profitStats.presentWeek" trend="up" :trendRatio="profitStats.ratioWeek" compareName="同比上周"></aside-card>
          </div>
          <div class="chart">
            <stats class="bar" title="分润统计" :onRadioChange="onProfitRadioChange" :onDateChange="onProfitDateChange"></stats>
            <line-chart height='300px' width='100%' :xAxisData="profitStats.xAxisData" :seriesData="profitStats.seriesData"></line-chart>
          </div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import $axios from '@/utils/axios'
import { formatTimeStamp } from '@/utils/date'
import { getDateByInterval } from '@/utils/date'
import LineChart from '@/components/charts/line'
import Bar from '@/components/charts/bar'
import Stats from './stats'
import AsideCard from './asideCard'
import constants from './constants'
import './order.scss'
const { statsType, dayHours } = constants

export default {
  name: 'order',
  components: {
    LineChart,
    Bar,
    Stats,
    AsideCard
  },
  data() {
    return {
      // 订单总览
      orderView: {
        paidOrder: 0,
        completedOrder: 0,
        unpaymentOrder: 0,
        refundedOrder: 0
      },
      paidOrderList: [], // 已付款订单
      unpaymentOrderList: [], // 待付款订单
      completedOrderList: [], // 服务订单
      cancelledOrderList: [], // 已取消订单
      queryOrderStatsParams: {
        type: '今日',
        date: []
      },
      querySalesStatsParams: {
        type: '今日',
        date: []
      },
      productSalesType: 1,
      productSalesChartOption: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['标准洗', '快速洗', '镀膜洗', '至尊洗'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '洗车量',
            type: 'bar',
            barWidth: '60%',
            data: [0, 0, 0, 0]
          }
        ]
      },
      orderStats: this.initStatsData(),
      salesStats: this.initStatsData(),
      washStats: this.initStatsData(),
      serviceStats: this.initStatsData(),
      profitStats: this.initStatsData(),
      formWashSearch: this.ininitFromSearch(),
      formServiceSearch: this.ininitFromSearch(),
      formProfitSearch: this.ininitFromSearch()
    }
  },
  mounted() {
    // 初始化加载数据
    this.init()
  },
  computed: {
    ...mapState({
      orgOptions: state => state.order.orgOptions,
      orderInfo: state => state.order.orderInfo,
      memberInfo: state => state.order.memberInfo
    })
  },
  methods: {
    ...mapActions(['getOrderInfo', 'getMemberInfo', 'getOrgOptions']),

    onOrderRadioChange(value) {
      this.getOrderStats(statsType.indexOf(value) + 1)
    },

    onOrderDateChange(value) {
      if (value) {
        this.getOrderStats(4, value[0], value[1])
      }
    },

    onSalesRadioChange(value) {
      this.getSalesStats(statsType.indexOf(value) + 1)
    },

    onSalesDateChange(value) {
      if (value) {
        this.getSalesStats(4, value[0], value[1])
      }
    },

    onWashRadioChange(value) {
      this.getWashStats(1, statsType.indexOf(value) + 1)
    },

    onWashDateChange(value) {
      if (value) {
        this.getWashStats(1, 4, value[0], value[1])
      }
    },

    onServiceRadioChange(value) {
      this.getServiceStats(1, statsType.indexOf(value) + 1)
    },

    onServiceDateChange(value) {
      if (value) {
        this.getServiceStats(1, 4, value[0], value[1])
      }
    },

    onProfitRadioChange(value) {
      this.getProfitStats(1, statsType.indexOf(value) + 1)
    },

    onProfitDateChange(value) {
      if (value) {
        this.getProfitStats(1, 4, value[0], value[1])
      }
    },

    // 监听所有者选择组件值变更事件
    onOrgOptionChange(type, organizationId) {
      this.getStoreOptions(organizationId, data => {
        switch (type) {
          case 'wash': // 洗车量统计 -> 所有者
            this.formWashSearch.storeOptions = data
            break
          case 'service': // 服务额统计 -> 所有者
            this.formServiceSearch.storeOptions = data
            break
          case 'profit': // 分润统计 -> 所有者
            this.formProfitSearch.storeOptions = data
            break
          default:
            break
        }
      })
    },

    // 查询订单统计
    getOrderStats(type, start = '', end = '') {
      $axios({
        url: '/api/v1/summary/orderstatic',
        method: 'get',
        params: {
          type: type,
          start: start,
          end: end
        }
      }).then(res => {
        const { resultObj } = res.data
        const { staticList, sumList, ...otherProps } = resultObj
        if (resultObj && staticList && Array.isArray(staticList)) {
          const result = this.calcStatsData(type, staticList, start, end)
          this.orderStats = {
            ...result,
            ...otherProps
          }
        }
      })
    },

    // 查询销售额
    getSalesStats(type, start = '', end = '') {
      $axios({
        url: '/api/v1/summary/salestatic',
        method: 'get',
        params: {
          type: type,
          start: start,
          end: end
        }
      }).then(res => {
        const { resultObj } = res.data
        const { staticList, sumList, ...otherProps } = resultObj
        if (resultObj && sumList && Array.isArray(sumList)) {
          const result = this.calcStatsData(type, sumList, start, end)
          this.salesStats = {
            ...result,
            ...otherProps
          }
        }
      })
    },

    // 查询洗车量统计
    getWashStats(storeId, type, start = '', end = '') {
      $axios({
        url: '/api/v1/summary/washstatic',
        method: 'get',
        params: {
          storeId: storeId,
          type: type,
          start: start,
          end: end
        }
      }).then(res => {
        const { resultObj } = res.data
        const { staticList, sumList, ...otherProps } = resultObj
        if (resultObj && staticList && Array.isArray(staticList)) {
          const result = this.calcStatsData(type, staticList, start, end)
          this.washStats = {
            ...result,
            ...otherProps
          }
        }
      })
    },

    // 查询服务额统计
    getServiceStats(storeId, type, start = '', end = '') {
      $axios({
        url: '/api/v1/summary/servicestatic',
        method: 'get',
        params: {
          storeId: storeId,
          type: type,
          start: start,
          end: end
        }
      }).then(res => {
        const { resultObj } = res.data
        const { staticList, sumList, ...otherProps } = resultObj
        if (resultObj && sumList && Array.isArray(sumList)) {
          const result = this.calcStatsData(type, sumList, start, end)
          this.serviceStats = {
            ...result,
            ...otherProps
          }
        }
      })
    },

    // 查询分润统计
    getProfitStats(storeId, type, start = '', end = '') {
      $axios({
        url: '/api/v1/summary/profitstatic',
        method: 'get',
        params: {
          storeId: storeId,
          type: type,
          start: start,
          end: end
        }
      }).then(res => {
        const { resultObj } = res.data
        const { staticList, sumList, ...otherProps } = resultObj
        if (resultObj && sumList && Array.isArray(sumList)) {
          const result = this.calcStatsData(type, sumList, start, end)
          this.profitStats = {
            ...result,
            ...otherProps
          }
        }
      })
    },

    // 查询订单总览
    getOrderView() {
      $axios({
        url: '/api/v1/summary/overview',
        method: 'get'
      }).then(res => {
        const { resultObj } = res.data
        this.orderView = resultObj
      })
    },

    // 查询实时销量
    getProductSales(type) {
      $axios({
        url: '/api/v1/summary/realtimesales',
        method: 'get',
        params: { type }
      }).then(res => {
        const { resultObj } = res.data
        const data = resultObj.map(item => item.saleCount)
        this.productSalesChartOption = {
          ...this.productSalesChartOption,
          series: {
            ...this.productSalesChartOption.series,
            data
          }
        }
      })
    },

    // 查询门店下拉选项
    getStoreOptions(organizationId, callback) {
      $axios({
        url: '/api/v1/store/queryStoreInfoList',
        method: 'get',
        params: { organizationId }
      }).then(res => {
        const { resultObj } = res.data
        let storeOptions = []
        if (resultObj && Array.isArray(resultObj)) {
          storeOptions = resultObj.map(item => {
            const { storeId, storeName, ...anyprops } = item
            return {
              label: storeName,
              value: storeId,
              ...anyprops
            }
          })
        }
        callback(storeOptions)
      })
    },

    // 查询订单详情
    loadOrderDetail(orderStatus) {
      $axios({
        url: '/api/v1/summary/orderDetail',
        method: 'get',
        params: { orderStatus }
      }).then(result => {
        const { resultObj } = result.data
        switch (orderStatus) {
          case 'paidOrder': // 已付款订单
            this.paidOrderList = resultObj
            break
          case 'unpaymentOrder': // 待付款订单
            this.unpaymentOrderList = resultObj
            break
          case 'completedOrder': // 服务订单
            this.completedOrderList = resultObj
            break
          case 'refundedOrder': // 已取消订单
            this.cancelledOrderList = resultObj
            break
        }
      })
    },

    calcStatsData(type, data, start = '', end = '') {
      let seriesData = []
      let xAxisData = []
      let subtractDay
      switch (type) {
        case 1:
          xAxisData = Array.from(dayHours)
          xAxisData.forEach(() => {
            seriesData.push(0)
          })
          break
        case 2:
        case 3:
          if (type === 2) {
            subtractDay = 6
          }
          if (type === 3) {
            subtractDay = 30
          }
          xAxisData = getDateByInterval(
            moment()
              .subtract('days', subtractDay)
              .valueOf(),
            moment().valueOf()
          )
          xAxisData.forEach(() => {
            seriesData.push(0)
          })
          break
        case 4:
          xAxisData = getDateByInterval(moment(start).valueOf(), moment(end).valueOf())
          xAxisData.forEach(() => {
            seriesData.push(0)
          })
          break
        default:
          break
      }
      data.forEach(item => {
        const { axis, totalcount } = item
        if (type === 1) {
          seriesData[+axis] = totalcount
        } else {
          seriesData[xAxisData.indexOf(axis)] = totalcount
        }
      })
      return { xAxisData, seriesData }
    },

    formatTime(row, column, cellValue) {
      return formatTimeStamp(cellValue)
    },

    initStatsData() {
      return {
        xAxisData: dayHours,
        seriesData: [],
        lastMonth: 0,
        lastWeek: 0,
        presentMonth: 0,
        presentWeek: 0,
        ratioMonth: '0%',
        ratioWeek: '0%'
      }
    },

    ininitFromSearch() {
      return {
        organizationId: '',
        storeId: '',
        orgOptions: [],
        storeOptions: []
      }
    },

    init() {
      this.getOrgOptions()
      this.getOrderInfo()
      this.getMemberInfo()
      this.getOrderView()
      this.getOrderStats(1)
      this.getSalesStats(1)
      this.getWashStats(1, 1)
      this.getServiceStats(1, 1)
      this.getProfitStats(1, 1)
      this.getProductSales(1)
    }
  }
}
</script>

