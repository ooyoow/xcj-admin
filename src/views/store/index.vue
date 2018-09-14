<template>
  <div :class="prefixCls">
    <el-form :inline="true" :model="formSearch">
      <el-form-item label="站点名">
        <el-input v-model="formSearch.storeName" placeholder="请输入站点名搜索"></el-input>
      </el-form-item>
      <el-form-item label="门店状态">
        <el-select v-model="formSearch.state" placeholder="请选择门店状态">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCreate">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :class="`${prefixCls}-table`" ref="multipleTable" :data="storeList" v-loading="listLoading" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="storeName" label="站点名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="storeCity" label="城市" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
      <el-table-column prop="storeManager" label="店长" show-overflow-tooltip></el-table-column>
      <el-table-column prop="storeId" label="编号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="storePro" label="省份" show-overflow-tooltip></el-table-column>
      <el-table-column prop="organizationId" label="终端ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="storeImg" label="图片" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="添加时间" show-overflow-tooltip :formatter="formatTime"></el-table-column>
      <el-table-column prop="storeDesc" label="描述" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column prop="state" label="门店状态" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row.storeId)">删除</el-button>
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div :class="`${prefixCls}-pagination`">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="dialogType[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="storeTemp" label-position="right" label-width="100px">
        <el-form-item label="门店名称" prop="storeName">
          <el-input v-model="storeTemp.storeName"></el-input>
        </el-form-item>
        <el-form-item label="门店ID" prop="storeId">
          <el-input v-model="storeTemp.storeId"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="storePro">
          <el-input v-model="storeTemp.storePro"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="storeCity">
          <el-input v-model="storeTemp.storeCity"></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="storeLocationX">
          <el-input v-model="storeTemp.storeLocationX"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="storeLocationY">
          <el-input v-model="storeTemp.storeLocationY"></el-input>
        </el-form-item>
        <el-form-item label="店长" prop="storeManager">
          <el-input v-model="storeTemp.storeManager"></el-input>
        </el-form-item>
        <el-form-item label="门店状态" prop="state">
          <el-select class="filter-item" v-model="storeTemp.state" placeholder="请选择门店状态">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="storeTemp.address"></el-input>
        </el-form-item>
        <el-form-item label="终端ID" prop="organizationId">
          <el-input v-model="storeTemp.organizationId"></el-input>
        </el-form-item>
        <el-form-item label="店铺图标" prop="storeLogo">
          <el-input v-model="storeTemp.storeImg"></el-input>
        </el-form-item>
        <el-form-item label="店铺图片" prop="storeImg">
          <el-input v-model="storeTemp.storeImg"></el-input>
        </el-form-item>
        <el-form-item label="广告语" prop="advertisement">
          <el-input v-model="storeTemp.advertisement"></el-input>
        </el-form-item>
        <el-form-item label="添加时间" prop="createTime">
          <el-date-picker v-model="storeTemp.createTime" type="datetime" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="storeDesc">
          <el-input v-model="storeTemp.storeDesc" type="textarea" :autosize="{ minRows: 2, maxRows: 4} " placeholder="请输入描述">
          </el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="storeTemp.remarks" type="textarea" :autosize="{ minRows: 2, maxRows: 4} " placeholder="请输入备注">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createStore">确认</el-button>
        <el-button v-else type="primary" @click="updateStore">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import $axios from "@/utils/axios";
import "./style.scss";
export default {
  name: "store",
  data() {
    return {
      prefixCls: "xcj-store",
      formSearch: {
        storeName: "",
        state: "",
        sort: ""
      },
      listQuery: {
        currentPage: 1,
        size: 10
      },
      listLoading: false,
      storeList: [],
      total: 0,

      // 新增/编辑对话框相关
      dialogFormVisible: false,
      dialogStatus: "create",
      dialogType: {
        create: "新增",
        update: "编辑"
      },
      statusOptions: [
        {
          label: "营业",
          value: "business"
        },
        {
          label: "暂停营业",
          value: "suspend"
        }
      ],
      rules: {
        storeName: [
          { required: true, message: "门店名称不能为空", trigger: "change" }
        ],
        storeId: [
          {
            required: true,
            message: "门店ID不能为空",
            trigger: "change"
          }
        ],
        storePro: [
          { required: true, message: "省份不能为空", trigger: "change" }
        ],
        storeManager: [
          { required: true, message: "店长不能为空", trigger: "change" }
        ],
        state: [
          { required: true, message: "门店状态不能为空", trigger: "change" }
        ],
        createTime: [
          {
            type: "date",
            required: true,
            message: "门店ID不能为空",
            trigger: "change"
          }
        ]
      },
      storeTemp: this.defaultStoreTemp()
    };
  },
  created() {
    this.getStore();
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    getStore() {
      this.listLoading = true;
      const params = Object.assign({}, this.formSearch, this.listQuery);
      $axios({
        url: "/api/v1/store/queryStoreList",
        method: "get",
        params: params
      })
        .then(response => {
          this.listLoading = false;
          const { resultObj, totalSize } = response.data;
          this.storeList = resultObj;
          this.total = totalSize;
        })
        .catch(error => {
          this.listLoading = false;
        });
    },
    handleSearch() {
      this.getStore();
    },
    handleCreate() {
      this.storeTemp = this.defaultStoreTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleUpdate(row) {
      this.storeTemp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createStore() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          $axios({
            url: "/api/v1/store/addStore",
            method: "post",
            data: this.storeTemp
          }).then(response => {
            this.storeList.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "添加成功",
              type: "success",
              duration: 2000
            });
            // this.$message({
            //   message: "操作成功",
            //   type: "success"
            // });
          });
        }
      });
    },
    updateStore() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const data = Object.assign({}, this.storeTemp);
          $axios({
            url: "/api/v1/store/editStore",
            method: "post",
            data: data
          }).then(response => {
            for (const v of this.storeList) {
              if (v.storeId === data.storeId) {
                const index = this.storeList.indexOf(v);
                this.storeList.splice(index, 1, data);
                break;
              }
            }
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    defaultStoreTemp() {
      return {
        address: "",
        advertisement: "",
        createTime: "",
        organizationId: 0,
        remarks: "",
        state: "",
        storeCity: "",
        storeDesc: "",
        storeLogo: "",
        storeImg: "",
        storeLocationX: "",
        storeLocationY: "",
        storeManager: "",
        storeName: "",
        storeId: "",
        storePro: ""
      };
    },
    handleDelete(storeId) {
      $axios({
        url: "/api/v1/store/deleteStore",
        method: "post",
        data: { storeId }
      }).then(response => {
        for (const v of this.storeList) {
          if (v.storeId === storeId) {
            const index = this.storeList.indexOf(v);
            this.storeList.splice(index, 1);
            this.$message({
              message: "删除成功",
              type: "success"
            });
            break;
          }
        }
      });
    },
    formatTime(row, column, cellValue) {
      return cellValue ? moment(cellValue).format("YYYY-MM-DD HH:mm:ss") : "";
    }
  }
};
</script>
