<template>
  <div :class="prefixCls">
    <el-form
      class="filter-container"
      :inline="true"
      v-model="queryParams"
    >
      <el-form-item label="门店">
        <el-select
          v-model="queryParams.storeId"
          placeholder="请选择门店"
          @input="handleSelectStore"
        >
          <el-option
            v-for="store in storeOptions"
            :key="store.value"
            :label="store.label"
            :value="store.value"
          ></el-option>
        </el-select>
      </el-form-item>
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
        <el-tag>合计到账服务额：{{profitTotal}} 元</el-tag>
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
        prop="storeName"
        label="门店名称"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="serverAmount"
        label="服务额"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="profitAmount"
        label="到账服务额"
        align="center"
        show-overflow-tooltip
      />
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
import './profit.scss'
import DateUtils from '@/utils/date'
import { debounce } from '@/utils/general'
import { _getStoreListByLoginUser, _getProfitStatsList } from '@/service/profit'
export default {
  name: 'profit',
  data() {
    return {
      prefixCls: 'xcj-finance-profit',
      storeOptions: [],
      queryParams: {
        date: this.initQueryDate(),
        storeId: '',
        currentPage: 1,
        size: 10
      },
      listLoading: false,
      list: [],
      total: 0,
      profitTotal: 0,
      onDateChange: null
    }
  },
  created() {
    this.initData()
    this.onDateChange = debounce(() => {
      this.queryParams.currentPage = 1
      this.getProfitStatsList(this.queryParams)
    }, 200)
  },
  methods: {
    handleSelectStore() {
      this.getProfitStatsList(this.queryParams)
    },
    handleSizeChange(val) {
      this.queryParams.size = val
      this.getProfitStatsList()
    },

    handleCurrentChange(val, key) {
      this.queryParams.currentPage = val
      this.getProfitStatsList()
    },

    // 查询列表
    getProfitStatsList() {
      const params = this.formatQueryParams()
      this.listLoading = true
      _getProfitStatsList(params)
        .then(response => {
          const { resultObj, totalSize } = response
          this.listLoading = false
          this.list = resultObj.serverstaticsList || []
          this.total = totalSize
          this.paytotal = resultObj.profitTotal
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

    initQueryDate() {
      const nowDate = DateUtils.format(+new Date(), 'YYYY-MM-DD')
      const pastThirtyDateTime = +new Date() - 60 * 60 * 24 * 1000 * 60
      const pastThirtyDate = DateUtils.format(pastThirtyDateTime, 'YYYY-MM-DD')
      return [pastThirtyDate, nowDate]
    },

    // 初始化加载数据
    initData() {
      _getStoreListByLoginUser().then(response => {
        const { resultObj } = response
        if (resultObj && Array.isArray(resultObj) && resultObj.length > 0) {
          this.storeOptions = resultObj.map((item, index) => {
            const { storeId, storeName } = item
            if (index === 0) {
              this.queryParams.storeId = storeId
            }
            return {
              label: storeName,
              value: storeId
            }
          })
          this.getProfitStatsList(this.queryParams)
        }
      })
    }
  }
}
</script>

