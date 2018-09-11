<template>
  <div :class="prefixCls">
    <div>
      <div class="user-increase">
        <div>会员增长情况</div>
        <div>
          <el-button type="primary">导出数据</el-button>
          <el-select v-model="queryUserIncrease.type" placeholder="请选择" @input="onInputQueryUserParam">
            <el-option v-for="item in queryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker v-model="queryUserIncrease.date" :clearable="false" :type="queryUserIncrease.type === 1 ? 'month' : 'year'" placeholder="选择年" @input="onInputQueryUserParam"></el-date-picker>
        </div>
      </div>
      <line-chart height='300px' width='100%' :xAxisData="userIncreate.xAxisData" :seriesData="userIncreate.seriesData"></line-chart>
    </div>
    <div>
      <div class="user-increase">
        <div>会员端口来源</div>
        <div>
          <el-button type="primary">导出数据</el-button>
          <el-select v-model="queryUserPortSource.type" placeholder="请选择" @input="onInputQueryUserPortSource">
            <el-option v-for="item in queryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker v-model="queryUserPortSource.date" :clearable="false" :type="queryUserPortSource.type === 1 ? 'month' : 'year'" placeholder="选择年" @input="onInputQueryUserPortSource" />
        </div>
      </div>
      <pie height='300px' width='100%' :legendData="userPortSource.legendData" :seriesData="userPortSource.seriesData"></pie>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import lineChart from '@/components/charts/line'
import pie from '@/components/charts/pie'
import $axios from '@/utils/axios'
import { getDateByInterval, createMonthByYear } from '@/utils/date'
import './portrait.scss'
export default {
  data() {
    return {
      prefixCls: 'xcj-user-portrait',
      xAxisData: [],
      seriesData: [],
      queryOptions: [
        {
          value: 1,
          label: '按月统计'
        },
        {
          value: 2,
          label: '按年统计'
        }
      ],
      queryUserIncrease: {
        type: 1,
        date: moment().format('YYYY-MM')
      },
      queryUserPortSource: {
        type: 1,
        date: moment().format('YYYY-MM')
      },
      userIncreate: {
        xAxisData: [],
        seriesData: []
      },
      userPortSource: {
        legendData: ['微信', '小程序', '共享联盟', '集团客户'],
        seriesData: [
          {
            name: '微信',
            value: 0
          },
          {
            name: '小程序',
            value: 0
          },
          {
            name: '共享联盟',
            value: 0
          },
          {
            name: '集团客户',
            value: 0
          }
        ]
      }
    }
  },
  components: {
    lineChart,
    pie
  },
  created() {
    this.onInputQueryUserParam()
    this.onInputQueryUserPortSource()
  },
  methods: {
    // 查询用户增长记录
    getUserIncrease(params) {
      $axios({
        method: 'get',
        url: '/api/v1/user/queryUserIncrease',
        params: params
      }).then(response => {
        const { resultObj } = response.data
        const { type, year, month } = params
        let xAxisData = [],
          seriesData = []
        switch (params.type) {
          case 1: // 按月查询
            const date = `${year}-${month}`
            const startDay = moment(date)
              .startOf('month')
              .valueOf()
            const endDay = moment(date)
              .endOf('month')
              .valueOf()
            xAxisData = getDateByInterval(startDay, endDay)
            break
          case 2:
            xAxisData = createMonthByYear(year)
            break
        }
        seriesData = xAxisData.map(item => 0)
        resultObj.forEach(item => {
          const { axis, totalcount } = item
          const index = xAxisData.indexOf(axis)
          index > 0 ? (seriesData[index] = totalcount) : seriesData
        })
        this.userIncreate = {
          xAxisData,
          seriesData
        }
      })
    },
    // 查询会员端口来源
    getUserPortSource(params) {
      $axios({
        method: 'get',
        url: '/api/v1/user/queryUserSource',
        params: params
      }).then(response => {
        const { groupCustomer, sharedAlliance, smallProgram, weChat } = response.data.resultObj || {}
        this.userPortSource.seriesData = [
          {
            name: '微信',
            value: weChat
          },
          {
            name: '小程序',
            value: smallProgram
          },
          {
            name: '共享联盟',
            value: sharedAlliance
          },
          {
            name: '集团客户',
            value: groupCustomer
          }
        ]
      })
    },
    onInputQueryUserParam(value) {
      const { type, date } = this.queryUserIncrease
      const year = moment(date).format('YYYY')
      const params = { type, year, month: '' }
      type === 1 ? (params.month = moment(date).format('MM')) : params
      this.getUserIncrease(params)
    },
    onInputQueryUserPortSource() {
      const { type, date } = this.queryUserPortSource
      // const year = moment(date).endOf('YYYY').valueOf()
      const params = { start: '', end: '' }
      switch (type) {
        case 1: // 按月查询
          Object.assign(params, {
            start: moment(date)
              .startOf('month')
              .valueOf(),
            end: moment(date)
              .endOf('month')
              .valueOf()
          })
          break
        case 2: // 按年查询
          Object.assign(params, {
            start: moment(`${moment(date).format('YYYY')}-01`)
              .startOf('month')
              .valueOf(),
            end: moment(`${moment(date).format('YYYY')}-12`)
              .endOf('month')
              .valueOf()
          })
          break
      }
      this.getUserPortSource(params)
    }
  }
}
</script>
