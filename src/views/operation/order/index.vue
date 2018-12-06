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
            v-model="formFilter.orderNo"
            placeholder="请输入订单编号"
            :class="[`${prefixCls}-filter-order-no`]"
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
            multiple
            clearable
            v-model="formFilter.productIds"
            placeholder="请选择产品类别"
          >
            <!-- <el-option
              v-for="item in productOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            /> -->
            <el-option-group
              v-for="group in productOptions"
              :key="group.type"
              :label="group.typeName"
            >
              <el-option
                v-for="item in group.productList"
                :key="item.id"
                :label="item.pName"
                :value="item.id"
              >
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="起止时间">
          <el-date-picker
            type="daterange"
            v-model="formFilter.date"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :class="[`${prefixCls}-filter-date`]"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
          >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-download"
            @click="handleExport"
          >导出数据</el-button>
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
        prop="pName"
        label="产品名称"
        align="center"
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
        prop="phone"
        label="手机号"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="userName"
        label="用户昵称"
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
import { _getOrderList, _getProductType } from "@/service/order";
import { pTypeMap } from "@/constants";
import { expandParams } from "@/utils/general";
import "./index.scss";
const appConfig = require("../../../../config/app");

export default {
  name: "user",
  data() {
    return {
      prefixCls: "xcj-oder-log",
      productOptions: [],
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
    this.getProductType();
  },
  methods: {
    handleSearch() {
      this.formFilter.currentPage = 1;
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
    handleExport() {
      const { currentPage, size, ...anyParams } = this.formatFormFilter();
      window.open(
        `${appConfig.baseUrl}/api/v1/payRecd/exportPayOrderBypage${expandParams(
          anyParams
        )}`
      );
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

    // 查询订单记录
    getOrderList() {
      this.loading = true;
      _getOrderList(this.formatFormFilter())
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

    // 查询产品分类
    getProductType() {
      _getProductType().then(response => {
        this.productOptions = response.resultObj;
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
    },
    formatFormFilter() {
      const { date, productIds, ...otherProps } = this.formFilter;
      return {
        productIds: productIds ? productIds.toString() : "",
        start: date && Array.isArray(date) ? date[0] : "",
        end: date && Array.isArray(date) ? date[1] : "",
        ...otherProps
      };
    }
  }
};
</script>

