<template>
  <div class="xcj-user">
    <div class="xcj-user-filter">
      <el-form
        :inline="true"
        :model="formSimpleFilter"
      >
        <el-form-item label="用户账号">
          <el-input
            v-model="formSimpleFilter.search"
            clearable
            placeholder="请输入用户账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            type="number"
            v-model="formMoreFilter.phone"
            clearable
            placeholder="请输入手机号查询"
          ></el-input>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input
            v-model="formMoreFilter.cardNo"
            clearable
            placeholder="请输入车牌号查询"
          ></el-input>
        </el-form-item>
        <el-form-item label="会龄">
          <el-input
            type="number"
            v-model.number="formSimpleFilter.registrationDays"
            clearable
            placeholder="请输入会龄查询"
          ></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-select
            v-model="formMoreFilter.source"
            clearable
            placeholder="请选择来源"
          >
            <el-option
              v-for="item in sourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
          >查询</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" :icon="showMoreFilter? 'el-icon-arrow-up':'el-icon-arrow-down'" @click="handleMoreFilter">更多条件</el-button>
        </el-form-item> -->
      </el-form>
      <!-- <el-form :inline="true" :model="formMoreFilter" v-show="showMoreFilter">
        <el-form-item label="用户昵称">
          <el-input v-model="formMoreFilter.nickName" placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="formMoreFilter.source" placeholder="请输入用户昵称"></el-input>
        </el-form-item>
      </el-form> -->
    </div>
    <el-table
      :data="user.list"
      v-loading="user.loading"
      highlight-current-row
    >
      <el-table-column
        prop="userName"
        label="用户账号"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="nickName"
        label="用户昵称"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="carBrand"
        label="车辆"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="registrationDays"
        label="会龄"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="source"
        label="来源"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="totalPayOrders"
        label="销售额"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="serviceAmount"
        label="服务额"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="orderNumber"
        label="订单数量"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="createtime"
        label="创建时间"
        align="center"
        :formatter="formatDate"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <el-button
            @click="handleConsumeList(scope.row)"
            type="text"
          >查看</el-button>
          <!-- <el-button type="text" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row.storeId)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div :class="`${prefixCls}-pagination`">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formSimpleFilter.currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="formSimpleFilter.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="user.total"
      >
      </el-pagination>
    </div>
    <!-- 消费详情 -->
    <el-dialog
      title="消费详情"
      border
      width="90%"
      :visible.sync="consume.visible"
    >
      <el-table
        :data="calcConsumeList()"
        v-loading="consume.loading"
      >
        <el-table-column
          property="pName"
          align="center"
          label="产品名称"
        ></el-table-column>
        <el-table-column
          property="pCode"
          align="center"
          label="产品编码"
        ></el-table-column>
        <el-table-column
          property="marketPrice"
          align="center"
          label="市场价"
        ></el-table-column>
        <el-table-column
          property="payMoney"
          align="center"
          label="售价"
        ></el-table-column>
        <el-table-column
          property="usedNum"
          align="center"
          label="已用/可用"
          :formatter="formatUseData"
        ></el-table-column>
        <el-table-column
          property="payTime"
          align="center"
          label="下单时间"
          show-overflow-tooltip
          :formatter="formatDate"
        ></el-table-column>
        <el-table-column
          property="useTime"
          align="center"
          label="洗车时间"
          show-overflow-tooltip
          :formatter="formatDate"
        ></el-table-column>
        <el-table-column
          property="cardNo"
          align="center"
          label="车牌"
        ></el-table-column>
        <el-table-column
          property="storeName"
          label="服务门店"
        ></el-table-column>
        <el-table-column
          property="driverName"
          label="终端名称"
        />
      </el-table>
      <div
        v-if="consume.total"
        :class="`${prefixCls}-pagination`"
      >
        <el-pagination
          background
          @size-change="handleConsumeSizeChange"
          @current-change="handleConsumeCurrentChange"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="consume.total"
        >
        </el-pagination>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑信息"
      :visible.sync="editDialog.visible"
    >
      <el-form
        ref="editForm"
        :rules="editDialog.rules"
        :model="editDialog.temp"
        label-position="right"
      >
        <el-form-item
          label="用户账号"
          prop="userName"
        >
          <el-input v-model="editDialog.temp.userName"></el-input>
        </el-form-item>
        <el-form-item
          label="用户昵称"
          prop="nickName"
        >
          <el-input v-model="editDialog.temp.nickName"></el-input>
        </el-form-item>
        <el-form-item
          label="车辆"
          prop="carBrand"
        >
          <el-select
            v-model="editDialog.temp.carBrand"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请添加车牌"
          >
            <el-option
              v-for="item in editDialog.temp.carBrand"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="销售额"
          prop="totalPayOrders"
        >
          <el-input v-model="editDialog.temp.totalPayOrders"></el-input>
        </el-form-item>
        <el-form-item
          label="服务额"
          prop="serviceAmount"
        >
          <el-input v-model="editDialog.temp.serviceAmount"></el-input>
        </el-form-item>
        <el-form-item
          label="订单数量"
          prop="orderNumber"
        >
          <el-input v-model="editDialog.temp.orderNumber"></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editDialog.visible=false">取消</el-button>
        <el-button
          type="primary"
          @click="updateUser"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import $axios from '@/utils/axios'
import DateUtils from '@/utils/date'
import './user.scss'
export default {
  name: 'user',
  data() {
    return {
      prefixCls: 'xcj-user',
      sourceOptions: [
        {
          value: 1,
          label: '微信'
        },
        {
          value: 2,
          label: '小程序'
        },
        {
          value: 3,
          label: '共享联盟'
        },
        {
          value: 4,
          label: '集团客户'
        }
      ],
      showMoreFilter: false,
      formSimpleFilter: {
        search: '',
        registrationDays: '',
        nickName: '',
        source: '',
        currentPage: 1,
        size: 10
      },
      formMoreFilter: {
        // nickName: ''
      },
      user: {
        loading: false,
        list: [],
        total: 0
      },
      consume: {
        visible: false,
        loading: false,
        currentPage: 1,
        size: 10,
        list: [],
        total: 0
      },
      editDialog: {
        visible: false,
        rules: {},
        temp: {}
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 查询用户
    getUserList() {
      const { formSimpleFilter, formMoreFilter, getUserList } = this
      const params = Object.assign({}, formSimpleFilter, formMoreFilter)
      this.user.loading = true
      $axios({
        url: '/api/v1/user/queryUserList',
        method: 'get',
        params: params
      }).then(response => {
        const { resultObj, totalSize } = response
        this.user = {
          loading: false,
          list: resultObj || [],
          total: totalSize
        }
      })
    },
    // 查询消费详情
    getConsumeList(userId) {
      this.consume = {
        ...this.consume,
        visible: true,
        loading: true
      }
      $axios({
        url: '/api/v1/user/queryUseRecdList',
        method: 'get',
        params: { userId }
      })
        .then(response => {
          const { resultObj, totalSize } = response
          this.consume = {
            ...this.consume,
            loading: false,
            list: resultObj || [],
            total: resultObj.length
          }
        })
        .catch(err => {
          this.consume.loading = false
        })
    },
    handleSearch() {
      this.getUserList()
    },
    handleMoreFilter() {
      this.showMoreFilter = !this.showMoreFilter
    },
    handleSizeChange(value) {
      this.formSimpleFilter.size = value
      this.getUserList()
    },
    handleCurrentChange(value) {
      this.formSimpleFilter.currentPage = value
      this.getUserList()
    },
    handleConsumeList(row) {
      this.getConsumeList(row.userId)
    },
    handleUpdate(row) {
      this.editDialog = {
        ...this.editDialog,
        visible: true,
        temp: Object.assign({}, row)
      }
      this.$nextTick(() => {
        this.$refs['editForm'].clearValidate()
      })
    },
    handleDelete() {},
    updateUser() {},
    handleConsumeSizeChange(val) {
      this.consume.size = val
    },
    handleConsumeCurrentChange(val) {
      this.consume.currentPage = val
    },
    calcConsumeList() {
      const { list, currentPage, size } = this.consume
      return list.slice((currentPage - 1) * size, currentPage * size)
    },
    formatDate(row, column, cellValue) {
      return DateUtils.format(cellValue)
    },
    formatUseData(row, column, cellValue) {
      const { num, usedNum } = row
      const surplus = num - usedNum
      return `${usedNum}/${surplus}`
    }
  }
}
</script>

