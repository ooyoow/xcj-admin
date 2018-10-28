<template>
  <div class="overview xcj-order">
    <el-row
      class="group-card"
      :gutter="12"
    >
      <el-col :span="6">
        <el-card shadow="always">
          <div class="order-overview">
            <div class="icon">
              <i
                class="el-icon-square"
                style="font-size: 2.5rem"
              />
            </div>
            <div class=" content">
              <div class="title ">订单（笔）</div>
              <div class="today">
                <div>{{orderInfo.todayPayRecd||0}}</div>
                <div>今日</div>
              </div>
              <div class="yesterday">
                <div>{{orderInfo.yesterdayPayRecd||0}}</div>
                <div>昨日</div>
              </div>
              <div class="seven-days">
                <div>{{orderInfo.last7DayPayRecd||0}}</div>
                <div>近7天</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="order-overview">
            <div class="icon">
              <i
                class="el-icon-square"
                style="font-size: 2.5rem"
              />
            </div>
            <div class=" content">
              <div class="title">洗车量（辆）</div>
              <div class="today">
                <div>{{orderInfo.todayWash||0}}</div>
                <div>今日</div>
              </div>
              <div class="yesterday">
                <div>{{orderInfo.yesterdayWash||0}}</div>
                <div>昨日</div>
              </div>
              <div class="seven-days">
                <div>{{orderInfo.last7DayWash||0}}</div>
                <div>近7天</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="order-overview">
            <div class="icon">
              <i
                class="el-icon-square"
                style="font-size: 2.5rem"
              />
            </div>
            <div class="content">
              <div class="title">销售额（元）</div>
              <div class="today">
                <div>{{orderInfo.salesToday||0}}</div>
                <div>今日</div>
              </div>
              <div class="yesterday">
                <div>{{orderInfo.salesYesterday||0}}</div>
                <div>昨日</div>
              </div>
              <div class="seven-days">
                <div>{{orderInfo.salesLast7Day||0}}</div>
                <div>近7天</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6 ">
        <el-card shadow="always">
          <div class="order-overview">
            <div class="icon">
              <i
                class="el-icon-square"
                style="font-size: 2.5rem"
              />
            </div>
            <div class="content">
              <div class="title">服务额（元）</div>
              <div class="today">
                <div>{{orderInfo.serveToday||0}}</div>
                <div>今日</div>
              </div>
              <div class="yesterday">
                <div>{{orderInfo.serveYesterday||0}}</div>
                <div>昨日</div>
              </div>
              <div class="seven-days">
                <div>{{orderInfo.serveLast7Day||0}}</div>
                <div>近7天</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card
        class="box-card"
        :body-style="{padding: 0}"
      >
        <div class="header">订单总览</div>
        <div style="margin-bottom:50px;">
          <el-col :span="6">
            <div class="order-data">
              <div>已付款订单</div>
              <div>
                <el-popover
                  placement="right"
                  trigger="hover"
                  @show="loadOrderDetail('paidOrder')"
                >
                  <div>
                    <el-table :data="calcOrderList(paidOrder)">
                      <el-table-column
                        align="center"
                        property="userName"
                        label="用户"
                      />
                      <el-table-column
                        align="center"
                        width="100"
                        property="carNo"
                        label="车牌"
                      />
                      <el-table-column
                        align="center"
                        property="pname"
                        label="产品名称"
                      />
                      <el-table-column
                        align="center"
                        property="marketPrice"
                        label="市场价"
                      />
                      <el-table-column
                        align="center"
                        property="payMoney"
                        label="售价"
                      />
                      <el-table-column
                        align="center"
                        width="150"
                        property="payTime"
                        label="支付时间"
                        :formatter="formatTime"
                      />
                    </el-table>
                    <br />
                    <el-pagination
                      background
                      @current-change="handleCurrentChange($event, 'paidOrder')"
                      :current-page="paidOrder.currentPage"
                      :page-size="paidOrder.size"
                      layout="total, prev, pager, next, jumper"
                      :total="paidOrder.total"
                    >
                    </el-pagination>
                  </div>
                  <span
                    slot="reference"
                    class="number"
                  >{{orderView.paidOrder||0}}</span>
                </el-popover>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="order-data">
              <div>待付款订单</div>
              <div>
                <el-popover
                  placement="right"
                  trigger="hover"
                  @show="loadOrderDetail('unpaymentOrder')"
                >
                  <div>
                    <el-table :data="calcOrderList(unpaymentOrder)">
                      <el-table-column
                        align="center"
                        property="userName"
                        label="用户"
                      />
                      <el-table-column
                        align="center"
                        width="100"
                        property="carNo"
                        label="车牌"
                      />
                      <el-table-column
                        align="center"
                        property="pname"
                        label="产品名称"
                      />
                      <el-table-column
                        align="center"
                        property="marketPrice"
                        label="市场价"
                      />
                      <el-table-column
                        align="center"
                        property="payMoney"
                        label="售价"
                      />
                      <el-table-column
                        align="center"
                        width="150"
                        property="payTime"
                        label="下单时间"
                        :formatter="formatTime"
                      />
                    </el-table>
                    <br />
                    <el-pagination
                      background
                      @current-change="handleCurrentChange($event, 'unpaymentOrder')"
                      :current-page="unpaymentOrder.currentPage"
                      :page-size="unpaymentOrder.size"
                      layout="total, prev, pager, next, jumper"
                      :total="unpaymentOrder.total"
                    >
                    </el-pagination>
                  </div>
                  <span
                    class="number"
                    slot="reference"
                  >{{orderView.unpaymentOrder||0}}</span>
                </el-popover>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="order-data">
              <div>服务订单</div>
              <div>
                <el-popover
                  placement="right"
                  trigger="hover"
                  @show="loadOrderDetail('completedOrder')"
                >
                  <div>
                    <el-table :data="calcOrderList(completedOrder)">
                      <el-table-column
                        align="center"
                        property="userName"
                        label="用户"
                      />
                      <el-table-column
                        align="center"
                        width="100"
                        property="carNo"
                        label="车牌"
                      />
                      <el-table-column
                        align="center"
                        property="pname"
                        label="产品名称"
                      />
                      <el-table-column
                        align="center"
                        property="marketPrice"
                        label="市场价"
                      />
                      <el-table-column
                        align="center"
                        property="payMoney"
                        label="售价"
                      />
                      <el-table-column
                        align="center"
                        property="storeName"
                        label="洗车门店"
                      />
                      <el-table-column
                        align="center"
                        width="150"
                        property="usetime"
                        label="洗车时间"
                        :formatter="formatTime"
                      />
                    </el-table>
                    <br />
                    <el-pagination
                      background
                      @current-change="handleCurrentChange($event, 'completedOrder')"
                      :current-page="completedOrder.currentPage"
                      :page-size="completedOrder.size"
                      layout="total, prev, pager, next, jumper"
                      :total="completedOrder.total"
                    >
                    </el-pagination>
                  </div>
                  <span
                    slot="reference"
                    class="number"
                  >{{orderView.completedOrder||0}}</span>
                </el-popover>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="order-data">
              <div>已取消订单</div>
              <div>
                <el-popover
                  placement="right"
                  trigger="hover"
                  @show="loadOrderDetail('cancelledOrder')"
                >
                  <div>
                    <el-table :data="calcOrderList(cancelledOrder)">
                      <el-table-column
                        property="userName"
                        label="用户"
                      />
                      <el-table-column
                        property="carNo"
                        label="车牌"
                      />
                      <el-table-column
                        property="pname"
                        label="产品名称"
                      />
                      <el-table-column
                        property="marketPrice"
                        label="市场价"
                      />
                      <el-table-column
                        property="payMoney"
                        label="售价"
                      />
                      <el-table-column
                        property="cancelTime"
                        label="取消时间"
                        :formatter="formatTime"
                      />
                    </el-table>
                    <br />
                    <el-pagination
                      background
                      @current-change="handleCurrentChange($event, 'cancelledOrder')"
                      :current-page="cancelledOrder.currentPage"
                      :page-size="cancelledOrder.size"
                      layout="total, prev, pager, next, jumper"
                      :total="cancelledOrder.total"
                    >
                    </el-pagination>
                  </div>
                  <span
                    class="number"
                    slot="reference"
                  >{{orderView.refundedOrder||0}}</span>
                </el-popover>
              </div>
            </div>
          </el-col>
        </div>
      </el-card>
    </el-row>
    <el-card
      class="box-card"
      :body-style="{padding: 0}"
    >
      <div class="header">用户总览</div>
      <div
        class="content"
        style="margin-bottom:20px;"
      >
        <el-row>
          <el-col :span="8">
            <div class="user-data">
              <div class="number">{{userView.todayCount}}</div>
              <div class="type">今日新增</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="user-data">
              <div class="number">{{userView.allCount}}</div>
              <div class="type">会员总数</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="user-data">
              <div class="number">{{userView.continuedUser}}</div>
              <div class="type">续卡会员</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-row>
      <el-card
        class="box-card"
        :body-style="{padding: 0}"
      >
        <div class="header">产品实时销量</div>
        <div class="product-sales">
          <div class="actions">
            <el-radio-group
              v-model="productSalesParams.type"
              @change="onProductSalesRadioChange"
            >
              <el-radio-button :label="0">套餐卡</el-radio-button>
              <el-radio-button :label="1">次卡</el-radio-button>
              <el-radio-button :label="2">优惠券</el-radio-button>
            </el-radio-group>
            <el-date-picker
              v-model="productSalesParams.date"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="onProductSalesDateChange"
            />
          </div>
          <bar
            height='300px'
            width='100%'
            :option="productSalesChartOption"
          />
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card
        class="box-card"
        :body-style="{padding: 0}"
      >
        <div class="header">订单统计</div>
        <div class="data-stats">
          <div class="aside">
            <aside-card
              title="本月订单总数"
              :count="orderStats.presentMonth"
              trend="up"
              :trendRatio="orderStats.ratioMonth"
              compareName="同比上月"
            ></aside-card>
            <aside-card
              title="本周订单数量"
              :count="orderStats.presentWeek"
              trend="up"
              :trendRatio="orderStats.ratioWeek"
              compareName="同比上周"
            ></aside-card>
          </div>
          <div class="chart">
            <stats
              class="bar"
              title="订单统计"
              :onRadioChange="onOrderRadioChange"
              :onDateChange="onOrderDateChange"
            ></stats>
            <line-chart
              height='300px'
              width='100%'
              yAxisName="（笔）"
              :xAxisData="orderStats.xAxisData"
              :seriesData="orderStats.seriesData"
            ></line-chart>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card
        class="box-card"
        :body-style="{padding: 0}"
      >
        <div class="header">销售统计</div>
        <div class="data-stats">
          <div class="aside">
            <aside-card
              title="本月销售总额"
              :count="salesStats.presentMonth"
              trend="up"
              :trendRatio="salesStats.ratioMonth"
              compareName="同比上月"
            ></aside-card>
            <aside-card
              title="本周销售总额"
              :count="salesStats.presentWeek"
              trend="up"
              :trendRatio="salesStats.ratioWeek"
              compareName="同比上周"
            ></aside-card>
          </div>
          <div class="chart">
            <stats
              class="bar"
              title="销售统计"
              :onRadioChange="onSalesRadioChange"
              :onDateChange="onSalesDateChange"
            ></stats>
            <line-chart
              yAxisName="（元）"
              height='300px'
              width='100%'
              :xAxisData="salesStats.xAxisData"
              :seriesData="salesStats.seriesData"
            ></line-chart>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card
        class="box-card"
        :body-style="{padding: 0}"
      >
        <div class="header">洗车量统计</div>
        <el-form
          class="search-form"
          :inline="true"
          :model="formWashParams"
        >
          <el-form-item label="所有者">
            <el-select
              v-model="formWashParams.organizationId"
              placeholder="请选择所有者"
              @change="onOrgOptionChange('wash', formWashParams.organizationId)"
            >
              <el-option
                v-for="item in orgOptions"
                :key="item.organizationId"
                :label="item.ownerName"
                :value="item.organizationId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门店">
            <el-select
              v-model="formWashParams.storeId"
              placeholder="请选择门店"
            >
              <el-option
                v-for="item in formWashParams.storeOptions"
                :key="item.storeId"
                :label="item.storeName"
                :value="item.storeId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="data-stats">
          <div class="aside">
            <aside-card
              title="本月洗车总量"
              :count="washStats.presentMonth"
              trend="up"
              :trendRatio="washStats.ratioMonth"
              compareName="同比上月"
            ></aside-card>
            <aside-card
              title="本周洗车总量"
              :count="washStats.presentWeek"
              trend="up"
              :trendRatio="washStats.ratioWeek"
              compareName="同比上周"
            ></aside-card>
          </div>
          <div class="chart">
            <stats
              class="bar"
              title="洗车量统计"
              :onRadioChange="onWashRadioChange"
              :onDateChange="onWashDateChange"
            ></stats>
            <line-chart
              yAxisName="（辆）"
              height='300px'
              width='100%'
              :xAxisData="washStats.xAxisData"
              :seriesData="washStats.seriesData"
            ></line-chart>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card
        class="box-card"
        :body-style="{padding: 0}"
      >
        <div class="header">服务额统计</div>
        <el-form
          class="search-form"
          :inline="true"
          :model="formServiceParams"
        >
          <el-form-item label="所有者">
            <el-select
              v-model="formServiceParams.organizationId"
              placeholder="请选择所有者"
              @change="onOrgOptionChange('service', formServiceParams.organizationId)"
            >
              <el-option
                v-for="item in orgOptions"
                :key="item.organizationId"
                :label="item.ownerName"
                :value="item.organizationId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门店">
            <el-select
              v-model="formServiceParams.storeId"
              placeholder="请选择门店"
            >
              <el-option
                v-for="item in formServiceParams.storeOptions"
                :key="item.storeId"
                :label="item.storeName"
                :value="item.storeId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="data-stats">
          <div class="aside">
            <aside-card
              title="本月服务额"
              :count="serviceStats.presentMonth"
              trend="up"
              :trendRatio="serviceStats.ratioMonth"
              compareName="同比上月"
            ></aside-card>
            <aside-card
              title="本周服务额"
              :count="serviceStats.presentWeek"
              trend="up"
              :trendRatio="serviceStats.ratioWeek"
              compareName="同比上周"
            ></aside-card>
          </div>
          <div class="chart">
            <stats
              class="bar"
              title="服务额统计"
              :onRadioChange="onServiceRadioChange"
              :onDateChange="onServiceDateChange"
            ></stats>
            <line-chart
              yAxisName="（元）"
              height='300px'
              width='100%'
              :xAxisData="serviceStats.xAxisData"
              :seriesData="serviceStats.seriesData"
            ></line-chart>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card
        class="box-card"
        :body-style="{padding: 0}"
      >
        <div class="header">分润统计</div>
        <el-form
          class="search-form"
          :inline="true"
          :model="formProfitParams"
        >
          <el-form-item label="所有者">
            <el-select
              v-model="formProfitParams.organizationId"
              placeholder="请选择所有者"
              @change="onOrgOptionChange('profit', formProfitParams.organizationId)"
            >
              <el-option
                v-for="item in orgOptions"
                :key="item.organizationId"
                :label="item.ownerName"
                :value="item.organizationId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门店">
            <el-select
              v-model="formProfitParams.storeId"
              placeholder="请选择门店"
            >
              <el-option
                v-for="item in formProfitParams.storeOptions"
                :key="item.storeId"
                :label="item.storeName"
                :value="item.storeId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="data-stats">
          <div class="aside">
            <aside-card
              title="本月分润额"
              :count="profitStats.presentMonth"
              trend="up"
              :trendRatio="profitStats.ratioMonth"
              compareName="同比上月"
            ></aside-card>
            <aside-card
              title="本周分润额"
              :count="profitStats.presentWeek"
              trend="up"
              :trendRatio="profitStats.ratioWeek"
              compareName="同比上周"
            ></aside-card>
          </div>
          <div class="chart">
            <stats
              class="bar"
              title="分润统计"
              :onRadioChange="onProfitRadioChange"
              :onDateChange="onProfitDateChange"
            ></stats>
            <line-chart
              yAxisName="（元）"
              height='300px'
              width='100%'
              :xAxisData="profitStats.xAxisData"
              :seriesData="profitStats.seriesData"
            ></line-chart>
          </div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import './order.scss'
import { mapState, mapActions } from 'vuex'
import { subDays } from 'date-fns'
import { formatTimeStamp } from '@/utils/date'
import { getDateByInterval } from '@/utils/date'
import LineChart from '@/components/charts/line'
import Bar from '@/components/charts/bar'
import Stats from './stats'
import AsideCard from './asideCard'
import { dayHours } from './constants'
import {
  getNearTrading,
  getOrderView,
  getUserView,
  getRealTimeSales,
  getOrderStats,
  getSalesStats,
  getWashStats,
  getServiceStats,
  getProfitStats,
  getOrderDetail,
  getStoreOptions
} from '@/service/trading'

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
      orderInfo: {}, // 今日、昨日、近七天交易服务数据
      orderView: {}, //订单总览
      userView: {}, // 用户总览
      paidOrder: this.defaultOrderDetail(), // 已付款订单
      unpaymentOrder: this.defaultOrderDetail(), // 待付款订单
      completedOrder: this.defaultOrderDetail(), // 服务订单
      cancelledOrder: this.defaultOrderDetail(), // 已取消订单
      queryOrderStatsParams: {
        type: '今日',
        date: []
      },
      querySalesStatsParams: {
        type: '今日',
        date: []
      },
      productSalesParams: {
        type: 0,
        date: []
      },
      productSalesChartOption: {
        color: ['#c5c8ce', '#2db7f5'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: (params, ticket, callback) => {
            return `<div>
                        <div>${params[0].name}</div>
                        <div>
                          <span style="display: inline-block;margin-right: 5px; border-radius: 10px;width: 10px; height: 10px; background-color: ${
                            params[1].color
                          };"></span>
                          <span>                           
                            余额：¥${params[1].data}，
                            剩余次数：${this.realTimeSalesUnUsedNo[params[1].dataIndex]}
                          </span>
                        </div>
                        <div>
                          <span style="display: inline-block;margin-right: 5px; border-radius: 10px;width: 10px; height: 10px; background-color: ${
                            params[0].color
                          };"></span>
                          <span>                           
                            服务额：¥${params[0].data}，
                            使用次数：${this.realTimeSalesUsedNo[params[0].dataIndex]}
                          </span>
                        </div>                        
                      </div>`
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
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '（元）'
          }
        ],
        series: []
      },
      realTimeSalesUsedNo: [], // 实时销量--使用次数
      realTimeSalesUnUsedNo: [], // 实时销量--剩余次数
      orderStats: this.initStatsData(),
      salesStats: this.initStatsData(),
      washStats: this.initStatsData(),
      serviceStats: this.initStatsData(),
      profitStats: this.initStatsData(),
      formWashParams: this.initFromSearchParams(),
      formServiceParams: this.initFromSearchParams(),
      formProfitParams: this.initFromSearchParams()
    }
  },
  mounted() {
    this.initData()
  },
  computed: {
    ...mapState({
      orgOptions: state => state.common.orgOptions
      // orderInfo: state => state.order.orderInfo,
      // userView: state => state.order.userView
    })
  },
  methods: {
    ...mapActions(['getOrderInfo', 'getuserView', 'getOrgOptions']),

    // 订单统计：今日/本周/本月
    onOrderRadioChange(value) {
      this.queryOrderStats(value)
    },

    // 订单统计：按起止日期查询
    onOrderDateChange(value) {
      if (value) {
        this.getOrderStats(4, value[0], value[1])
      }
    },

    // 销售统计：今日/本周/本月
    onSalesRadioChange(value) {
      this.querySalesStats(value)
    },

    // 销售统计：按起止日期查询
    onSalesDateChange(value) {
      if (value) {
        this.querySalesStats(4, value[0], value[1])
      }
    },

    // 洗车量统计：今日/本周/本月
    onWashRadioChange(value) {
      this.queryWashStats(1, value)
    },

    // 洗车量统计：按起止日期查询
    onWashDateChange(value) {
      if (value) {
        this.queryWashStats(this.formWashParams.storeId, 4, value[0], value[1])
      }
    },

    // 服务额统计：今日/本周/本月
    onServiceRadioChange(value) {
      this.queryServiceStats(1, value)
    },

    // 服务额统计：按起止日期查询
    onServiceDateChange(value) {
      if (value) {
        this.queryServiceStats(this.formServiceParams.storeId, 4, value[0], value[1])
      }
    },

    // 分润统计：今日/本周/本月
    onProfitRadioChange(value) {
      this.queryProfitStats(1, value)
    },

    // 分润统计：按起止日期查询
    onProfitDateChange(value) {
      if (value) {
        this.queryProfitStats(this.formProfitParams.storeId, 4, value[0], value[1])
      }
    },

    // 监听所有者选择组件值变更事件
    onOrgOptionChange(type, organizationId) {
      this.queryStoreOptions(organizationId, data => {
        switch (type) {
          case 'wash': // 洗车量统计 -> 所有者
            this.formWashParams.storeOptions = data
            break
          case 'service': // 服务额统计 -> 所有者
            this.formServiceParams.storeOptions = data
            break
          case 'profit': // 分润统计 -> 所有者
            this.formProfitParams.storeOptions = data
            break
          default:
            break
        }
      })
    },

    // 产品实时销量：套餐卡/次卡/优惠券
    onProductSalesRadioChange(type) {
      this.getProductSales(type)
    },

    // 分润统计：按起止日期查询
    onProductSalesDateChange(value) {
      this.getProductSales(this.productSalesParams.type, value[0], value[1])
    },

    // 查询订单统计
    queryOrderStats(type, start = '', end = '') {
      getOrderStats(type, start, end).then(response => {
        const { resultObj } = response
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

    // 查询销售统计
    querySalesStats(type, start = '', end = '') {
      getSalesStats(type, start, end).then(response => {
        const { resultObj } = response
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
    queryWashStats(storeId, type, start = '', end = '') {
      getWashStats(storeId, type, start, end).then(response => {
        const { resultObj } = response
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
    queryServiceStats(storeId, type, start = '', end = '') {
      getServiceStats(storeId, type, start, end).then(response => {
        const { resultObj } = response
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
    queryProfitStats(storeId, type, start = '', end = '') {
      getProfitStats(storeId, type, start, end).then(response => {
        const { resultObj } = response
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

    // 实时销量
    getProductSales(type, start = '', end = '') {
      getRealTimeSales(type, start, end).then(response => {
        const { resultObj } = response
        let usedNoList = []
        let unUsedNoList = []
        let xAxisData = []
        let seriesData = [
          {
            type: 'bar',
            stack: 'realTimeSales',
            data: []
          },
          {
            type: 'bar',
            stack: 'realTimeSales',
            data: []
          }
        ]
        if (resultObj && Array.isArray(resultObj)) {
          resultObj.forEach((item, index) => {
            const { pName, usedCount, unUsedCount, serverAmount, unServerAmount } = item
            xAxisData.push(pName)
            usedNoList.push(usedCount)
            unUsedNoList.push(unUsedCount)
            seriesData[0].data.push(serverAmount)
            seriesData[1].data.push(unServerAmount)
          })
        }
        this.realTimeSalesUsedNo = usedNoList
        this.realTimeSalesUnUsedNo = unUsedNoList
        this.productSalesChartOption.xAxis[0].data = xAxisData
        this.productSalesChartOption.series = seriesData
      })
    },

    // 查询门店下拉选项
    queryStoreOptions(organizationId, callback) {
      getStoreOptions(organizationId).then(response => {
        const { resultObj } = response
        let storeOptions = []
        if (resultObj && Array.isArray(resultObj)) {
          storeOptions = resultObj
        }
        callback(storeOptions)
      })
    },

    // 查询订单详情
    loadOrderDetail(orderStatus) {
      getOrderDetail().then(response => {
        const { resultObj } = response
        switch (orderStatus) {
          case 'paidOrder': // 已付款订单
            this.paidOrder = {
              ...this.paidOrder,
              currentPage: 1,
              list: resultObj || [],
              total: resultObj ? resultObj.length : 0
            }
            break
          case 'unpaymentOrder': // 待付款订单
            this.unpaymentOrder = {
              ...this.unpaymentOrderList,
              list: resultObj || [],
              total: resultObj ? resultObj.length : 0
            }
            break
          case 'completedOrder': // 服务订单
            this.completedOrder = {
              ...this.completedOrder,
              list: resultObj || [],
              total: resultObj ? resultObj.length : 0
            }
            break
          case 'cancelledOrder': // 已取消订单
            this.cancelledOrder = {
              ...this.cancelledOrder,
              list: resultObj || [],
              total: resultObj ? resultObj.length : 0
            }
            break
        }
      })
    },

    // 分页查询
    handleCurrentChange(val, key) {
      switch (key) {
        case 'paidOrder':
          this.paidOrder.currentPage = val
          break
        case 'unpaymentOrder':
          this.unpaymentOrder.currentPage = val
          break
        case 'completedOrder':
          this.completedOrder.currentPage = val
          break
        case 'cancelledOrder':
          this.cancelledOrder.currentPage = val
          break
      }
    },

    calcStatsData(type, data, start, end) {
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
          xAxisData = getDateByInterval(+subDays(new Date(), subtractDay), +new Date())
          xAxisData.forEach(() => {
            seriesData.push(0)
          })
          break
        case 4:
          xAxisData = getDateByInterval(+new Date(start), +new Date(end))
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

    // 分页显示订单数据
    calcOrderList(data) {
      const { list, currentPage, size } = data
      return list.slice((currentPage - 1) * size, currentPage * size)
    },

    formatTime(row, column, cellValue) {
      return formatTimeStamp(cellValue)
    },

    // 默认订单详情
    defaultOrderDetail() {
      return {
        currentPage: 1,
        size: 5,
        list: [],
        total: 0
      }
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

    initFromSearchParams() {
      return {
        organizationId: '',
        storeId: '',
        storeOptions: []
      }
    },

    initData() {
      // 获取今日、昨日、近七天交易数据
      getNearTrading().then(response => {
        this.orderInfo = response.resultObj
      })

      // 获取订单总览
      getOrderView().then(response => {
        this.orderView = response.resultObj
      })

      // 获取用户总览
      getUserView().then(response => {
        this.userView = response.resultObj
      })
      // 获取产品实时销量
      this.getProductSales(0)

      // 获取订单统计
      this.queryOrderStats(1)

      // 获取销售统计
      this.querySalesStats(1)

      // 查询所有者
      this.getOrgOptions(data => {
        if (Array.isArray(data) && data.length) {
          const { organizationId } = data[0]
          this.queryStoreOptions(organizationId, storeOptions => {
            if (storeOptions.length) {
              const { storeId } = storeOptions[0]
              const formSearchParams = () => {
                return {
                  organizationId: organizationId,
                  storeId: storeId,
                  storeOptions: storeOptions
                }
              }
              this.formWashParams = formSearchParams()
              this.formServiceParams = formSearchParams()
              this.formProfitParams = formSearchParams()
              this.queryWashStats(storeId, 1)
              this.queryServiceStats(storeId, 1)
              this.queryProfitStats(storeId, 1)
            }
          })
        }
      })
    }
  }
}
</script>

