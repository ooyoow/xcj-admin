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
      <el-table-column prop="pName" label="套餐名称" show-overflow-tooltip></el-table-column>
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
    <el-dialog :title="dialogType[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="packageTemp" label-position="right" label-width="100px">
        <el-form-item label="套餐名称" prop="pname">
          <el-input v-model="packageTemp.pname"></el-input>
        </el-form-item>
        <el-form-item label="产品编号" prop="pcode">
          <el-input v-model="packageTemp.pcode"></el-input>
        </el-form-item>
        <el-form-item label="市场价" prop="marketPrice">
          <el-input v-model="packageTemp.marketPrice"></el-input>
        </el-form-item>
        <el-form-item label="售价" prop="price">
          <el-input v-model="packageTemp.price"></el-input>
        </el-form-item>
        <el-form-item label="次数" prop="pnum">
          <el-input v-model="packageTemp.pnum"></el-input>
        </el-form-item>
        <el-form-item label="广告语" prop="advertisement">
          <el-input v-model="packageTemp.advertisement"></el-input>
        </el-form-item>
        <el-form-item label="有效期" prop="pvalidateTime">
          <el-date-picker v-model="packageTemp.pvalidateTime" type="datetime" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="集团客户" prop="groupCustomer">
          <el-input v-model="packageTemp.groupCustomer"></el-input>
        </el-form-item> -->
        <el-form-item label="推荐指数" prop="recommend">
          <el-input v-model="packageTemp.recommend"></el-input>
        </el-form-item>
        <el-form-item label="发行量" prop="pAllnum">
          <el-input v-model="packageTemp.pAllnum"></el-input>
        </el-form-item>
        <el-form-item label="上架时间" prop="upTime">
          <el-input v-model="packageTemp.upTime"></el-input>
        </el-form-item>
        <el-form-item label="下架时间" prop="downTime">
          <el-input v-model="packageTemp.downTime"></el-input>
        </el-form-item>
        <el-form-item label="产品图片" prop="pimg">
          <el-input v-model="packageTemp.pimg"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createPackage">确认</el-button>
        <el-button v-else type="primary" @click="updatePackage">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapActions } from "vuex";
import $axios from "@/utils/axios";
import "./package.scss";
export default {
  name: "package",
  data() {
    return {
      prefixCls: "xcj-product-package",
      listQuery: {
        search: "",
        type: 1,
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
      packageList: [],
      dialogStatus: "create",
      dialogType: {
        create: "新增",
        update: "编辑"
      },
      dialogFormVisible: false,
      packageTemp: {
        pname: "",
        pcode: "",
        marketPrice: "",
        price: "",
        pnum: "",
        advertisement: "",
        pvalidateTime: "",
        recommend: "",
        pAllnum: "",
        upTime: "",
        downTime: "",
        pimg: ""
      },
      rules: {
        pname: [
          { required: true, message: "产品名称不能为空", trigger: "change" }
        ],
        pcode: [
          { required: true, message: "产品编码不能为空", trigger: "change" }
        ],
        marketPrice: [
          { required: true, message: "产品编码不能为空", trigger: "change" }
        ],
        price: [
          { required: true, message: "产品售价不能为空", trigger: "change" }
        ],
        pnum: [{ required: true, message: "次数不能为空", trigger: "change" }],
        advertisement: [
          { required: true, message: "广告语不能为空", trigger: "change" }
        ],
        pvalidateTime: [
          { required: true, message: "广告语不能为空", trigger: "change" }
        ],
        recommend: [
          { required: true, message: "广告语不能为空", trigger: "change" }
        ],
        pAllnum: [
          { required: true, message: "广告语不能为空", trigger: "change" }
        ],
        upTime: [
          { required: true, message: "广告语不能为空", trigger: "change" }
        ],
        downTime: [
          { required: true, message: "广告语不能为空", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getPackageList();
    this.getProductStatsByType({
      params: { type: 1 },
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
    },
    createPackage() {},
    updatePackage() {}
  }
};
</script>
