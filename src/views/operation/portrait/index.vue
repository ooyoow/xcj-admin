<template>
  <div :class="prefixCls">
    <div>
      <div class="user-increase">
        <div>会员增长情况</div>
        <div>
          <el-button type="primary">导出数据</el-button>
          <el-select v-model="queryUserIncrease.type" placeholder="请选择">
            <el-option v-for="item in queryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker v-model="queryUserIncrease.date" :type="queryUserIncrease.type === 1 ? 'month' : 'year'" placeholder="选择年"></el-date-picker>
        </div>
      </div>
      <line-chart height='300px' width='100%' :xAxisData="xAxisData" :seriesData="seriesData"></line-chart>
    </div>
    <div>
      <div class="user-increase">
        <div>会员端口来源</div>
        <div>
          <el-button type="primary">导出数据</el-button>
          <el-select v-model="queryUserIncrease.type" placeholder="请选择">
            <el-option v-for="item in queryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker v-model="queryUserIncrease.date" :type="queryUserIncrease.type === 1 ? 'month' : 'year'" placeholder="选择年"></el-date-picker>
        </div>
      </div>
      <pie height='300px' width='100%' :xAxisData="xAxisData" :seriesData="seriesData"></pie>
    </div>
  </div>
</template>

<script>
import lineChart from '@/components/charts/line'
import pie from '@/components/charts/pie'
import './portrait.scss'
export default {
  data() {
    return {
      prefixCls: 'xcj-user-portrait',
      xAxisData: [],
      seriesData: [],
      queryUserIncrease: {
        type: 1,
        date: ''
      },
      queryOptions: [
        {
          value: 1,
          label: '按月统计'
        },
        {
          value: 2,
          label: '按年统计'
        }
      ]
    }
  },
  components: {
    lineChart,
    pie
  },
  methods: {
    getUserIncrease() {
      $axios({
        method: 'get',
        url: '/api/v1/user/queryUserIncrease',
        params: params
      }).then(response => {
        const { resultObj } = response.data
        callback(resultObj || {})
      })
    }
  }
}
</script>
