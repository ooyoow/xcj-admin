<template>
  <div :class="prefixCls">
    <el-form :inline="true" :model="formSearch">
      <el-form-item label="终端名称">
        <el-input clearable v-model="formSearch.search" placeholder="请输入终端名称/ID搜索"></el-input>
      </el-form-item>
      <el-form-item label="所属门店">
        <el-select clearable v-model="formSearch.storeId" placeholder="请选择所属门店">
          <el-option v-for="item in storeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getTerminal">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :class="`${prefixCls}-table`" :data="terminalList" v-loading="listLoading">
      <el-table-column prop="driverid" label="终端ID" align="center" show-overflow-tooltip />
      <el-table-column prop="currCardno" label="终端编号" align="center" show-overflow-tooltip />
      <el-table-column prop="driverName" label="终端名称" align="center" show-overflow-tooltip />
      <el-table-column prop="manufactor" label="厂家" align="center" show-overflow-tooltip />
      <el-table-column prop="model" label="型号" align="center" show-overflow-tooltip />
      <el-table-column prop="type" label="设备类型" align="center" show-overflow-tooltip :formatter="formatType" />
      <el-table-column prop="storeName" label="所属门店" align="center" show-overflow-tooltip />
      <el-table-column prop="state" label="工作状态" align="center" show-overflow-tooltip :formatter="formatState" />
      <el-table-column prop="createTime" label="添加时间" align="center" show-overflow-tooltip :formatter="formatTime" />
      <el-table-column fixed="right" label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row.driverid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div :class="`${prefixCls}-pagination`">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="dialogType[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="terminalTemp" label-position="right" label-width="100px">
        <el-form-item label="终端ID" prop="driverid">
          <el-input v-model="terminalTemp.driverid" :readonly="dialogStatus==='update'"></el-input>
        </el-form-item>
        <el-form-item label="终端编号" prop="currCardno">
          <el-input v-model="terminalTemp.currCardno"></el-input>
        </el-form-item>
        <el-form-item label="终端名称" prop="driverName">
          <el-input v-model="terminalTemp.driverName"></el-input>
        </el-form-item>
        <el-form-item label="厂家" prop="manufactor">
          <el-input v-model="terminalTemp.manufactor"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="type">
          <el-select v-model="terminalTemp.type" placeholder="请选择设备类型">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属门店" prop="storeId">
          <el-select v-model="terminalTemp.storeId" placeholder="请选择所属门店">
            <el-option v-for="item in storeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作状态" prop="state">
          <el-select v-model="terminalTemp.state" placeholder="请选择工作状态">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="terminalTemp.model"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createTerminal">确认</el-button>
        <el-button v-else type="primary" @click="updateTerminal">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import $axios from '@/utils/axios'
import { expandParams } from '@/utils/general'
import DateUtils from '@/utils/date'
import './style.scss'
export default {
  name: 'Terminal',
  data() {
    return {
      prefixCls: 'xcj-terminal',
      formSearch: {
        search: '',
        storeId: ''
      },
      listQuery: {
        currentPage: 1,
        size: 10
      },
      listLoading: false,
      terminalList: [],
      total: 0,
      storeOptions: [],
      // 新增/编辑对话框相关
      dialogFormVisible: false,
      dialogStatus: 'create',
      dialogType: {
        create: '新增',
        update: '编辑'
      },
      statusOptions: [
        {
          label: '空闲',
          value: 'free'
        },
        {
          label: '运行中',
          value: 'run'
        }
      ],
      typeOptions: [
        {
          label: '龙门机',
          value: 1
        },
        {
          label: '隧道机',
          value: 2
        }
      ],
      rules: {
        currCardno: [{ required: true, message: '终端编号不能为空', trigger: 'change' }],
        driverName: [{ required: true, message: '终端名称不能为空', trigger: 'change' }],
        driverid: [{ required: true, message: '终端ID不能为空', trigger: 'change' }],
        manufactor: [{ required: true, message: '厂家不能为空', trigger: 'change' }],
        mode: [{ required: true, message: '型号不能为空', trigger: 'change' }],
        type: [{ required: true, message: '设备类型不能为空', trigger: 'change' }],
        storeId: [{ required: true, message: '所属门店不能为空', trigger: 'change' }],
        state: [{ required: true, message: '工作状态不能为空', trigger: 'change' }]
      },
      terminalTemp: this.defaultTerminalTemp()
    }
  },
  created() {
    this.getStoreByLoginUser()
    this.getTerminal()
  },
  methods: {
    handleCurrentChange(value) {
      this.listQuery.currentPage = value
      this.getTerminal()
    },
    handleSizeChange(value) {
      this.listQuery.size = value
      this.getTerminal()
    },
    // 查询当前登录账户所属门店
    getStoreByLoginUser() {
      $axios({
        url: '/api/v1/store/queryStoreByUser',
        method: 'get'
      }).then(response => {
        const { resultObj } = response
        if (resultObj && Array.isArray(resultObj)) {
          this.storeOptions = resultObj.map(item => {
            return {
              label: item.storeName,
              value: item.storeId
            }
          })
        }
      })
    },
    // 查询终端
    getTerminal() {
      const params = Object.assign({}, this.formSearch, this.listQuery)
      this.listLoading = true
      $axios({
        url: '/api/v1/driver/queryDriverList',
        method: 'get',
        params: params
      }).then(response => {
        this.listLoading = false
        const { resultObj, totalSize } = response
        this.terminalList = resultObj
        this.total = totalSize
      })
    },
    handleCreate() {
      this.terminalTemp = this.defaultTerminalTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      const { createTime, updateTime, updateUser, createUser, ...anyprops } = row
      this.terminalTemp = Object.assign({}, anyprops)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(driverid) {
      $axios({
        url: '/api/v1/driver/deleteDriverInfo',
        method: 'post',
        params: { driverid }
      }).then(() => {
        for (const v of this.terminalList) {
          if (v.driverid === driverid) {
            const index = this.terminalList.indexOf(v)
            this.terminalList.splice(index, 1)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            break
          }
        }
      })
    },
    createTerminal() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          $axios({
            url: '/api/v1/driver/addDriverInfo',
            method: 'post',
            data: this.terminalTemp
          }).then(() => {
            this.terminalList.unshift(this.terminalTemp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateTerminal() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const data = Object.assign({}, this.terminalTemp)
          $axios({
            url: '/api/v1/driver/editDriverInfo',
            method: 'post',
            data: data
          }).then(() => {
            for (const v of this.terminalList) {
              if (v.driverid === data.driverid) {
                const index = this.terminalList.indexOf(v)
                this.terminalList.splice(index, 1, data)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    defaultTerminalTemp() {
      return {
        driverName: '',
        driverid: '',
        currCardno: '',
        manufactor: '',
        model: '',
        state: '',
        storeId: '',
        type: ''
      }
    },
    formatTime(row, column, cellValue) {
      return DateUtils.format(cellValue)
    },
    formatState(row, column, cellValue) {
      const stateMap = {
        free: '空闲',
        run: '运行中'
      }
      return stateMap[cellValue]
    },
    formatType(row, column, cellValue) {
      const typeMap = {
        1: '龙门机',
        2: '隧道机'
      }
      return typeMap[cellValue]
    }
  }
}
</script>
