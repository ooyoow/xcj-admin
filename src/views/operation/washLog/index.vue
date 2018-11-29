<template>
  <div :class="prefixCls">
    <div class="xcj-user-filter">
      <el-form
        :inline="true"
        :model="formFilter"
      >
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
        <el-form-item label="车牌号">
          <el-input
            clearable
            v-model.number="formFilter.cardNo"
            placeholder="请输入车牌号"
          />
        </el-form-item>
        <el-form-item label="产品类别">
          <el-select
            v-model="formFilter.pType"
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
        <el-form-item label="门店">
          <el-select
            v-model="formFilter.storeName"
            clearable
            placeholder="请选择门店"
          >
            <el-option
              v-for="item in storeOptions"
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
        prop="cardNo"
        label="车牌号"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="pType"
        label="产品名称"
        align="center"
        show-overflow-tooltip
        :formatter="formatPtype"
      />
      <el-table-column
        prop="storeName"
        label="洗车门店"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="num"
        label="已用/可用"
        align="center"
        show-overflow-tooltip
        :formatter="formatCount"
      />
      <el-table-column
        prop="useTime"
        label="洗车时间"
        align="center"
        show-overflow-tooltip
        :formatter="formatDate"
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
import { _getStoreOptions, _getWashList } from "@/service/washLog";
import { productOptions, pTypeMap } from "@/constants";
import "./index.scss";
export default {
  name: "user",
  data() {
    return {
      prefixCls: "xcj-wash-log",
      productOptions: productOptions,
      storeOptions: [],
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
    this.getStoreOptions();
    this.getWashList();
  },
  methods: {
    handleSearch() {
      this.getWashList();
    },
    handleSizeChange(value) {
      this.formFilter.size = value;
      this.getWashList();
    },
    handleCurrentChange(value) {
      this.formFilter.currentPage = value;
      this.getWashList();
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
    getWashList() {
      this.loading = true;
      _getWashList(this.formFilter)
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

