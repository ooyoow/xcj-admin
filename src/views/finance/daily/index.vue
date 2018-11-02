<template>
  <div :class="prefixCls">
    <el-form
      class="filter-container"
      :inline="true"
      v-model="queryParams"
    >
      <el-form-item label="起止时间">
        <el-date-picker
          :clearable="false"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="queryParams.date"
          @change="onDateChange"
        />
      </el-form-item>
      <div class="paytotal">
        <el-tag>合计：{{paytotal}} 元</el-tag>
      </div>
    </el-form>

    <el-table
      :class="`${prefixCls}-table`"
      v-loading="listLoading"
      :data="list"
    >
      <el-table-column
        prop="day"
        label="日期"
        align="center"
        :formatter="formatTime"
        show-overflow-tooltip
      />
      <el-table-column
        prop="orderNum"
        label="订单总数"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="payAmount"
        label="支付金额"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="check"
        label="核销状态"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.check ? 'success' : 'danger'">{{scope.row.check | checkFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            :disabled="scope.row.check"
            @click="handleWriteOff(scope.row.id)"
          >核销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div :class="`${prefixCls}-pagination`">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="queryParams.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import $axios from '@/utils/axios'
import DateUtils from '@/utils/date'
import { debounce } from '@/utils/general'
import './daily.scss'
import { _getDailySales, _dailyWriteOff } from '@/service/daily'
export default {
  name: 'daily',
  data() {
    return {
      prefixCls: 'xcj-finance-daily',
      queryParams: {
        date: this.initDate(),
        orderNo: '',
        currentPage: 1,
        size: 10
      },
      listLoading: false,
      list: [],
      total: 0,
      paytotal: 0,
      onDateChange: null
    }
  },
  created() {
    this.getDailySales(this.queryParams)
    this.onDateChange = debounce(() => {
      this.queryParams.currentPage = 1
      this.getDailySales(this.queryParams)
    }, 200)
  },
  methods: {
    handleSizeChange(val) {
      this.queryParams.size = val
      this.getDailySales()
    },

    handleCurrentChange(val, key) {
      this.queryParams.currentPage = val
      this.getDailySales()
      switch (key) {
        case 'order':
          this.queryParams.currentPage = val
          this.getDailySales()
          break
        case 'washDetail':
          this.washDetail.currentPage = val
          break
      }
    },

    // 核销
    handleWriteOff(id) {
      _dailyWriteOff(id).then(response => {
        for (const v of this.list) {
          if (v.id === id) {
            const index = this.list.indexOf(v)
            this.list[index] = Object.assign(this.list[index], { check: true })
            this.$message.success('核销成功')
            // this.$message({
            //   message: '删除成功',
            //   type: 'success'
            // })
            break
          }
        }
      })
    },

    // 查询每日统计list
    getDailySales() {
      const params = this.formatQueryParams()
      this.listLoading = true
      _getDailySales(params)
        .then(response => {
          const { resultObj, totalSize } = response
          this.listLoading = false
          this.list = resultObj.orderstaticsList || []
          this.total = totalSize
          this.paytotal = resultObj.paytotal
        })
        .catch(error => {
          this.listLoading = false
        })
    },

    formatQueryParams() {
      const { date, ...otherProps } = this.queryParams
      return {
        start: date && Array.isArray(date) ? date[0] : '',
        end: date && Array.isArray(date) ? date[1] : '',
        ...otherProps
      }
    },
    formatTime(row, column, cellValue) {
      return DateUtils.format(cellValue, 'YYYY-MM-DD')
    },
    initDate() {
      const nowDate = DateUtils.format(+new Date(), 'YYYY-MM-DD')
      const pastThirtyDateTime = +new Date() - 60 * 60 * 24 * 1000 * 30
      const pastThirtyDate = DateUtils.format(pastThirtyDateTime, 'YYYY-MM-DD')
      return [pastThirtyDate, nowDate]
    }
  },
  filters: {
    checkFilter(val) {
      return val ? '已核销' : '未核销'
    }
  }
}
</script>

