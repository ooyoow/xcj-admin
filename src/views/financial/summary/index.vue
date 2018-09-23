<template>
  <div :class="prefixCls">
    <div class="filter-container">
      <el-button type="primary" @click="handleExport">导出数据</el-button>
      <el-radio-group v-model="queryParams.type" @change="handleFilterRadioGroup">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="最近30天"></el-radio-button>
        <el-radio-button label="最近90天"></el-radio-button>
      </el-radio-group>
      <el-date-picker v-model="queryParams.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="handleFilterDate"></el-date-picker>
    </div>
    <div class="stats-item">
      <div class="category">关键指标</div>
      <el-table :data="KPIList" border>
        <el-table-column prop="date" label="洗车总量" align="center" />
        <el-table-column prop="name" label="服务总额" align="center" />
        <el-table-column prop="address" label="销售总额" align="center" />
        <el-table-column prop="address" label="到账服务总额" align="center" />
        <el-table-column prop="address" label="未分到账服务总额" align="center" />
      </el-table>
    </div>
    <div class="stats-item">
      <div class="category">大类销量统计</div>
      <el-table :data="bigSalesList" border>
        <el-table-column prop="date" label="套餐销售总额" align="center" />
        <el-table-column prop="name" label="限次卡销售总额" align="center" />
        <el-table-column prop="address" label="优惠券赠送总额" align="center" />
        <el-table-column prop="address" label="优惠券销售总额" align="center" />
      </el-table>
    </div>
    <div class="stats-item">
      <div class="category">产品销量统计</div>
      <el-table :data="KPIList" border>
        <el-table-column prop="date" label="产品名称" align="center" />
        <el-table-column prop="name" label="销量" align="center" />
      </el-table>
    </div>
    <div class="stats-item">
      <div class="category">门店服务额统计</div>
      <el-table :data="KPIList" border>
        <el-table-column prop="date" label="门店名称" align="center" />
        <el-table-column prop="name" label="洗车量" align="center" />
        <el-table-column prop="name" label="服务额" align="center" />
      </el-table>
    </div>
    <div class="stats-item">
      <div class="category">所有者分润统计</div>
      <el-table :data="KPIList" border>
        <el-table-column prop="date" label="所有者" align="center" />
        <el-table-column prop="name" label="到账服务总额" align="center" />
        <el-table-column prop="name" label="分润额" align="center" />
        <el-table-column prop="name" label="分润比例" align="center" />
      </el-table>
    </div>
    <div class="stats-item">
      <div class="category">订单统计</div>
      <el-table :data="KPIList" border>
        <el-table-column prop="date" label="销售订单总数" align="center" />
        <el-table-column prop="name" label="待服务订单总数" align="center" />
        <el-table-column prop="name" label="待服务订单总额" align="center" />
        <el-table-column prop="name" label="待付款订单总数" align="center" />
        <el-table-column prop="name" label="待付款订单总额" align="center" />
        <el-table-column prop="name" label="退款订单总数" align="center" />
        <el-table-column prop="name" label="退款订单总额" align="center" />
        <el-table-column prop="name" label="优惠劵赠送总数" align="center" />
        <el-table-column prop="name" label="优惠劵销售总数" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import './summary.scss'
export default {
  name: 'Summary',
  data() {
    return {
      prefixCls: 'xcj-financial-summary',
      queryParams: {
        type: '',
        date: ''
      },
      KPIList: [],
      bigSalesList: []
    }
  },
  methods: {
    handleExport() {},
    handleFilterRadioGroup() {},
    handleFilterDate() {}
  }
}
</script>

