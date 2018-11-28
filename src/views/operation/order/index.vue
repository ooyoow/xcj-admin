<template>
  <div :class="prefixCls">
    <div :class="[`${prefixCls}-filter`]">
      <el-form
        :inline="true"
        :model="formFilter"
      >
        <el-form-item label="订单编号">
          <el-input
            clearable
            type="number"
            v-model.number="formFilter.orderNo"
            placeholder="请输入订单编号"
          />
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input
            v-model="formFilter.userName"
            clearable
            placeholder="请输入用户昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            type="number"
            v-model="formFilter.phone"
            clearable
            placeholder="请输入手机号查询"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品类别">
          <el-select
            v-model="formFilter.pName"
            clearable
            placeholder="请选择产品类别"
          >
            <el-option
              v-for="item in productOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="list"
      v-loading="loading"
      highlight-current-row
    >
      <el-table-column
        prop="orderNo"
        label="订单编号"
        align="center"
        :width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="payMoney"
        label="支付金额（元）"
        align="center"
        :width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="payTime"
        label="支付时间"
        align="center"
        show-overflow-tooltip
        :formatter="formatDate"
      />
      <el-table-column
        prop="userName"
        label="用户昵称"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="phone"
        label="手机号"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="pName"
        label="产品名称"
        align="center"
        show-overflow-tooltip
      />
    </el-table>
    <div :class="`${prefixCls}-pagination`">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formFilter.currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="formFilter.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import $axios from "@/utils/axios";
import DateUtils from "@/utils/date";
import { _getOrderList } from "@/service/order";
import { productOptions, pTypeMap } from "@/constants";
import "./index.scss";
export default {
  name: "user",
  data() {
    return {
      prefixCls: "xcj-oder-log",
      productOptions: productOptions,
      formFilter: {
        currentPage: 1,
        size: 10
      },
      loading: false,
      list: [],
      total: 0
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    handleSearch() {
      this.getOrderList();
    },
    handleSizeChange(value) {
      this.formFilter.size = value;
      this.getOrderList();
    },
    handleCurrentChange(value) {
      this.formFilter.currentPage = value;
      this.getOrderList();
    },
    // 查询门店下拉选项
    getStoreOptions() {
      _getStoreOptions().then(response => {
        const { resultObj } = response;
        if (resultObj && Array.isArray(resultObj)) {
          this.storeOptions = resultObj.map(item => {
            const { storeName, storeId, ...anyprops } = item;
            return {
              label: storeName,
              value: storeId,
              ...anyprops
            };
          });
        }
      });
    },

    // 查询洗车记录
    getOrderList() {
      this.loading = true;
      _getOrderList(this.formFilter)
        .then(response => {
          this.loading = false;
          const { resultObj, totalSize } = response;
          this.list = resultObj || [];
          this.total = totalSize;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    formatPtype(row, column, cellValue) {
      return pTypeMap[cellValue] || "";
    },
    formatCount(row, column, cellValue) {
      const { num, usedNum } = row;
      return `${usedNum}/${num}`;
    },
    formatDate(row, column, cellValue) {
      return DateUtils.format(cellValue);
    }
  }
};
</script>

