<template>
  <div :class="prefixCls">
    <div class="filter-container">
      <div class="filter-item">
        <el-input v-model="listQuery.search" clearable @input="handleSearch" placeholder="输入套餐名称/产品ID搜索"></el-input>
      </div>
      <div class="filter-item">
        <el-radio-group v-model="listQuery.productStatus" @change="onRadioChange">
          <el-radio-button label="">全部
            <span>({{stats.count}})</span>
          </el-radio-button>
          <el-radio-button label="online">今日在线
            <span>({{stats.onlineNumber}})</span>
          </el-radio-button>
          <el-radio-button label="warehouse">仓库
            <span>({{stats.warehouseNumber}})</span>
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-table :class="`${prefixCls}-table`" :data="packageList" tooltip-effect="dark">
      <el-table-column prop="pName" label="限次卡名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="manufactor" label="产品图片" show-overflow-tooltip></el-table-column>
      <el-table-column prop="marketPrice" label="市场价" show-overflow-tooltip></el-table-column>
      <el-table-column prop="pNum" label="次数" show-overflow-tooltip></el-table-column>
      <el-table-column prop="advertisement" label="广告语" show-overflow-tooltip></el-table-column>
      <el-table-column prop="pAllnum" label="发行量" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remarks" label="状态"></el-table-column>
      <el-table-column prop="pContent" label="简介"></el-table-column>
      <!-- <el-table-column prop="groupCustomer" label="集团客户" show-overflow-tooltip></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="150 ">
        <template slot-scope="scope">
          <el-button type="text" @click="handleUpdate(scope.row) ">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row.id) ">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import $axios from "@/utils/axios";
import "./card.scss";
export default {
  name: "card",
  data() {
    return {
      prefixCls: "xcj-product-card",
      listQuery: {
        search: "",
        type: 2,
        currentPage: 1,
        size: 10,
        productStatus: "",
        sort: ""
      },
      stats: {
        onlineNumber: 0,
        warehouseNumber: 0,
        count: 0
      },
      packageList: []
    };
  },
  created() {
    this.getPackageList();
    this.getProductStatsByType({
      params: { type: 2 },
      callback: data => {
        const { onlineNumber, warehouseNumber } = data;
        this.stats = {
          onlineNumber: onlineNumber,
          warehouseNumber: warehouseNumber,
          count: onlineNumber + warehouseNumber
        };
      }
    });
  },
  methods: {
    ...mapActions(["getProduct", "getProductStatsByType", "deleteProduct"]),
    getPackageList() {
      this.getProduct({
        params: this.listQuery,
        callback: data => {
          this.packageList = data;
        }
      });
    },
    onRadioChange() {
      this.getPackageList();
    },
    handleSearch(value) {
      this.getPackageList();
    },
    handleUpdate() {},
    handleDelete(id) {
      this.deleteProduct({
        params: { id },
        callback: result => {
          for (const p of this.packageList) {
            if (p.id === id) {
              const index = this.packageList.indexOf(p);
              this.packageList.splice(index, 1);
              this.$message({
                message: "删除成功",
                type: "success"
              });
              break;
            }
          }
        }
      });
    }
  }
};
</script>