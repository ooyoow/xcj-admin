<template>
  <div :class="prefixCls">
    <el-form class="filter-container" :inline="true" :model="formSearch">
      <el-form-item label="起止时间">
        <el-date-picker v-model="formSearch.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="handleFilterDate" />
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input v-model="formSearch.orderNo" @input="handleFilterOrderNo"></el-input>
      </el-form-item>
    </el-form>
    <el-table :class="`${prefixCls}-table`" :data="dataList">
      <el-table-column prop="date" label="订单号" />
      <el-table-column prop="name" label="产品名称" />
      <el-table-column prop="name" label="产品ID" />
      <el-table-column prop="name" label="账户" />
      <el-table-column prop="name" label="所有者" />
      <el-table-column prop="name" label="市场价" />
      <el-table-column prop="name" label="售价" />
      <el-table-column prop="name" label="已用/可用" />
      <el-table-column prop="name" label="服务额" />
      <el-table-column prop="name" label="服务门店" />
      <el-table-column prop="name" label="服务车牌与时间" />
      <el-table-column prop="name" label="状态与时间" />
      <el-table-column prop="name" label="备注" />
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row.storeId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import "./sale.scss";
export default {
  name: "sale",
  data() {
    return {
      prefixCls: "xcj-finance-sale",
      formSearch: {},
      dataList: []
    };
  },
  methods: {
    handleFilterDate() {},
    handleFilterOrderNo() {}
  }
};
</script>

