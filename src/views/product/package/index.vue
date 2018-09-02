<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-type`">
      <el-radio-group v-model="listQuery.type" @change="onRadioChange">
        <el-radio-button :label="1">全部套餐
          <span>(1000)</span>
        </el-radio-button>
        <el-radio-button :label="2">今日在线
          <span></span>
        </el-radio-button>
        <el-radio-button :label="3">仓库
          <span></span>
        </el-radio-button>
      </el-radio-group>
    </div>
    <el-form :class="`${prefixCls}-form-search`" :inline="true" :model="listQuery">
      <el-form-item label="输入搜索">
        <el-input v-model="listQuery.search" placeholder="套餐名称/产品ID搜索"></el-input>
      </el-form-item>
    </el-form>
    <el-table :class="`${prefixCls}-table`" :data="packageList" tooltip-effect="dark">
      <el-table-column type=" selection" width="55"></el-table-column>
      <el-table-column prop="driverName" label="套餐名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="driverid" label="产品ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="manufactor" label="产品图片" show-overflow-tooltip></el-table-column>
      <el-table-column prop="currCardno" label="集团客户" show-overflow-tooltip></el-table-column>
      <el-table-column prop="storeId" label="市场价" show-overflow-tooltip></el-table-column>
      <el-table-column prop="state" label="次数" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="广告语" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remarks" label="发行量" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remarks" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150 ">
        <template slot-scope="scope">
          <el-button type="text " size="small " @click="handleUpdate(scope.row) ">编辑</el-button>
          <el-button type="text " size="small " @click="handleDelete(scope.row.driverid) ">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import $axios from '@/utils/axios'
import './package.scss'
export default {
  name: 'package',
  data() {
    return {
      prefixCls: 'product-package',
      listQuery: {
        search: '',
        type: 1,
        currentPage: 1,
        size: 10,
        sort: ''
      },
      packageList: []
    }
  },
  created() {
    this.getPackage(this.listQuery)
  },
  methods: {
    getPackage(params) {
      $axios({
        url: '/api/v1/product/queryProductList',
        method: 'get',
        params: params
      }).then(result => {
        console.log(result)
      })
    },
    onRadioChange() {
      this.getPackage(this.listQuery)
    }
  }
}
</script>
