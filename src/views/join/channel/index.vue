<template>
  <div class="xcj-join-channel">
    <div class="item">
      <div class="header">
        <div>渠道开发</div>
        <div>
          <el-button>添加</el-button>
        </div>
      </div>
      <el-table :data="channelTypeList" tooltip-effect="dark" v-loading="typeListLoading">
        <el-table-column prop="driverName" label="渠道类型" show-overflow-tooltip/>
        <el-table-column prop="driverid" label="图片" show-overflow-tooltip/>
        <el-table-column prop="manufactor" label="文字" show-overflow-tooltip/>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="item">
      <el-form :inline="true" :model="formSearch">
        <el-form-item label="阶段">
          <el-input clearable v-model="formSearch.step" placeholder="请输入阶段搜索"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input clearable v-model="formSearch.city" placeholder="请输入城市搜索"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input clearable v-model="formSearch.name" placeholder="请输入名称搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCreate">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="channelCustomerList" tooltip-effect="dark" v-loading="customerListLoading">
        <el-table-column prop="customerName" label="客户名称" show-overflow-tooltip/>
        <el-table-column prop="phone" label="电话" show-overflow-tooltip/>
        <el-table-column prop="city" label="城市" show-overflow-tooltip/>
        <el-table-column prop="address" label="地址" show-overflow-tooltip/>
        <el-table-column prop="content" label="交流内容" show-overflow-tooltip/>
        <el-table-column prop="step" label="阶段" show-overflow-tooltip/>
        <el-table-column prop="time" label="时间" show-overflow-tooltip/>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip/>
        <el-table-column fixed="right" align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import './channel.scss'
export default {
  data() {
    return {
      formSearch: {
        step: '',
        city: '',
        name: ''
      },
      typeListLoading: false,
      customerListLoading: false,
      channelTypeList: [],
      channelCustomerList: []
    }
  },
  methods: {
    handleSearch() {},
    handleCreate() {},
    handleDelete() {}
  }
}
</script>

