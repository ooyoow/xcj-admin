<template>
  <div :class="prefixCls">
    <el-form class="filter-container" :inline="true" :model="queryOrderParams">
      <el-form-item label="起止时间">
        <el-date-picker v-model="queryOrderParams.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="_getOrderList" />
      </el-form-item>
      <el-form-item label="订单编号">
        <el-input v-model="queryOrderParams.orderNo" clearable @input="_getOrderList"></el-input>
      </el-form-item>
    </el-form>
    <el-table :class="`${prefixCls}-table`" v-loading="order.loading" :data="order.list">
      <el-table-column prop="orderNo" label="订单号" show-overflow-tooltip />
      <el-table-column prop="pName" label="产品名称" show-overflow-tooltip />
      <el-table-column prop="pCode" label="产品编号" align="center" show-overflow-tooltip />
      <el-table-column prop="userName" label="用户名" align="center" show-overflow-tooltip />
      <el-table-column prop="marketPrice" label="市场价" align="center" show-overflow-tooltip />
      <el-table-column prop="pRice" label="售价" align="center" show-overflow-tooltip />
      <el-table-column prop="usedNum" label="已用/可用" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.usedNum ? +scope.row.usedNum : 0}}/{{(scope.row.num ? scope.row.num : 0) - (scope.row.usedNum ? +scope.row.usedNum : 0)}}
        </template>
      </el-table-column>
      <el-table-column prop="serviceAmount" label="服务额" align="center" show-overflow-tooltip />
      <el-table-column prop="storeName" label="服务门店" show-overflow-tooltip />
      <el-table-column prop="cardNo" label="服务车牌与时间" align="center" width="110">
        <template slot-scope="scope">
          <el-popover placement="top" trigger="hover" @show="getWashDetail(scope.row.orderNo)">
            <div>
              <el-table :data="calcWashList()" v-loading="washDetail.loading">
                <el-table-column align="center" prop="storeName" label="服务门店" />
                <el-table-column align="center" property="cardNo" label="车牌" />
                <el-table-column align="center" property="useTime" width="150" label="洗车时间" :formatter="formatTime" />
              </el-table>
              <br/>
              <div>
                <el-pagination background @current-change="handleCurrentChange($event, 'washDetail')" :current-page="washDetail.currentPage" :page-size="washDetail.size" layout="total, prev, pager, next, jumper" :total="washDetail.total">
                </el-pagination>
              </div>
            </div>
            <span slot="reference" class="wash-detail">详情</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="payResult" label="支付状态" show-overflow-tooltip />
      <el-table-column prop="payTime" label="支付时间" :formatter="formatTime" show-overflow-tooltip />
    </el-table>
    <div :class="`${prefixCls}-pagination`">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange($event, 'order')" :current-page="queryOrderParams.currentPage" :page-sizes="[10,20,30, 50]" :page-size="queryOrderParams.size" layout="total, sizes, prev, pager, next, jumper" :total="order.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import $axios from "@/utils/axios";
import DateUtils from "@/utils/date";
import { debounce } from "@/utils/general";
import "./sale.scss";
export default {
  name: "sale",
  data() {
    return {
      prefixCls: "xcj-finance-sale",
      queryOrderParams: {
        date: [],
        orderNo: "",
        currentPage: 1,
        size: 10
      },
      order: {
        loading: false,
        list: [],
        total: 0
      },
      washDetail: {
        loading: false,
        currentPage: 1,
        size: 5,
        list: [],
        total: 0
      },
      _getOrderList: null
    };
  },
  created() {
    this.getOrderList(this.queryOrderParams);
    this._getOrderList = debounce(() => {
      this.queryOrderParams.currentPage = 1;
      this.getOrderList(this.queryOrderParams);
    }, 200);
  },
  methods: {
    handleSizeChange(val) {
      this.queryOrderParams.size = val;
      this.getOrderList();
    },
    handleCurrentChange(val, key) {
      switch (key) {
        case "order":
          this.queryOrderParams.currentPage = val;
          this.getOrderList();
          break;
        case "washDetail":
          this.washDetail.currentPage = val;
          break;
      }
    },

    // 查询订单list
    getOrderList(params) {
      this.order.loading = true;
      $axios({
        url: "/api/v1/finance/queryOrderList",
        method: "get",
        params: this.formatqueryOrderParams(params)
      })
        .then(response => {
          const { resultObj, totalSize } = response;
          this.order = {
            loading: false,
            list: resultObj || [],
            total: totalSize
          };
        })
        .catch(error => {
          this.order.loading = false;
        });
    },

    //  查询订单洗车记录
    getWashDetail(orderNo) {
      this.washDetail = {
        ...this.washDetail,
        currentPage: 1,
        loading: true
      };
      $axios({
        url: "/api/v1/finance/queryUseRecordByOrderNo",
        method: "get",
        params: { orderNo }
      })
        .then(response => {
          const { resultObj, totalSize } = response;
          this.washDetail = {
            ...this.washDetail,
            loading: false,
            list: resultObj || [],
            total: Array.isArray(resultObj) ? resultObj.length : 0
          };
        })
        .catch(error => {
          this.washDetail.loading = false;
        });
    },
    formatqueryOrderParams() {
      const { date, ...otherProps } = this.queryOrderParams;
      return {
        start: date && Array.isArray(date) ? date[0] : "",
        end: date && Array.isArray(date) ? date[1] : "",
        ...otherProps
      };
    },
    formatTime(row, column, cellValue) {
      return DateUtils.format(cellValue);
    },
    calcWashList() {
      const { list, currentPage, size } = this.washDetail;
      return list.slice((currentPage - 1) * size, currentPage * size);
    }
  }
};
</script>

