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
        <el-button type="primary" @click="getTerminal">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCreate">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :class="`${prefixCls}-table`" :data="terminalList" tooltip-effect="dark" v-loading="listLoading">
      <el-table-column prop="driverName" label="终端名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="driverid" label="终端ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="manufactor" label="厂家" show-overflow-tooltip></el-table-column>
      <el-table-column prop="currCardno" label="型号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="storeId" label="所属门店" show-overflow-tooltip></el-table-column>
      <el-table-column prop="state" label="工作状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" label="添加时间" show-overflow-tooltip :formatter="formatTime"></el-table-column>
      <el-table-column prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
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
        <el-form-item label="终端名称" prop="driverName">
          <el-input v-model="terminalTemp.driverName"></el-input>
        </el-form-item>
        <el-form-item label="终端ID" prop="driverid">
          <el-input v-model="terminalTemp.driverid"></el-input>
        </el-form-item>
        <el-form-item label="厂家" prop="manufactor">
          <el-input v-model="terminalTemp.manufactor"></el-input>
        </el-form-item>
        <el-form-item label="型号" prop="currCardno">
          <el-input v-model="terminalTemp.currCardno"></el-input>
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
        <el-form-item label="添加时间" prop="createTime">
          <el-date-picker v-model="terminalTemp.createTime" type="datetime" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="terminalTemp.remarks" type="textarea" :autosize="{ minRows: 2, maxRows: 4} " placeholder="请输入备注">
          </el-input>
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
import moment from 'moment'
import $axios from '@/utils/axios'
import { expandParams } from '@/utils/general'
import { formatTimeStamp } from '@/utils/date'
import './style.scss'
export default {
  name: 'store',
  data() {
    return {
      prefixCls: 'cw-store',
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
      rules: {
        driverName: [{ required: true, message: '终端名称不能为空', trigger: 'change' }],
        driverid: [{ required: true, message: '终端ID不能为空', trigger: 'change' }],
        manufactor: [{ required: true, message: '厂家不能为空', trigger: 'change' }],
        currCardno: [{ required: true, message: '型号不能为空', trigger: 'change' }],
        storeId: [{ required: true, message: '所属门店不能为空', trigger: 'change' }],
        state: [{ required: true, message: '工作状态不能为空', trigger: 'change' }],
        createTime: [{ required: true, message: '添加时间不能为空', trigger: 'change' }],
        remarks: [{ required: true, message: '备注不能为空', trigger: 'change' }]
      },
      terminalTemp: this.defaultTerminalTemp()
    }
  },
  created() {
    this.getStoreByLoginUser()
    this.getTerminal()
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    // 查询所属门店
    getStoreByLoginUser() {
      $axios({
        url: '/api/v1/store/queryStoreByUser',
        method: 'get'
      }).then(response => {
        const { resultObj } = response.data
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
        const { resultObj, totalSize } = response.data
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
      this.terminalTemp = Object.assign({}, row)
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
        data: { driverid }
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
            // this.$message({
            //   message: "操作成功",
            //   type: "success"
            // });
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
        createTime: '',
        currCardno: '',
        manufactor: '',
        model: '',
        state: '',
        storeId: '',
        type: ''
      }
    },
    formatTime(row, column, cellValue) {
      return formatTimeStamp(cellValue)
    }
  }
}
</script>
