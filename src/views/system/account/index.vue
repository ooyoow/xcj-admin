<template>
  <div class="xcj-system-account">
    <el-form class="form-filter" :inline="true" :model="formSearch">
      <el-form-item label="账户名">
        <el-input clearable v-model="formSearch.loginId" placeholder="请输入账户名查询"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input clearable v-model="formSearch.name" placeholder="请输入昵称查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCreate">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" tooltip-effect="dark" v-loading="listLoading">
      <el-table-column prop="loginId" label="账户名" show-overflow-tooltip/>
      <el-table-column prop="name" label="昵称" show-overflow-tooltip/>
      <el-table-column prop="type" label="类型" show-overflow-tooltip :formatter="formatType" />
      <el-table-column prop="email" label="邮箱" show-overflow-tooltip/>
      <el-table-column prop="active" label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag :type="scope.row.active | activeFilter">{{scope.row.active | activeNameFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip :formatter="formatTime" />
      <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip :formatter="formatTime" />
      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.active === 1" @click="handleModifyActive(scope.row)">禁用
          </el-button>
          <el-button type="text" v-if="scope.row.active === 0" @click="handleModifyActive(scope.row)">启用
          </el-button>
          <el-button type="text" @click="handleUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogType[dialogStatus]" :visible.sync="dialogVisible">
      <el-form :rules="rules" ref="accountForm" :model="accountTemp" label-position="right" label-width="80px">
        <el-form-item label="账户名" prop="loginId">
          <el-input v-model="accountTemp.loginId"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="accountTemp.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="accountTemp.type" placeholder="请选择类型" @input="getBusinessOptions">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="accountTemp.type && accountTemp.type !== 1" :label="accountTemp.type | businessFilter" prop="businessId">
          <el-select v-model="accountTemp.businessId" placeholder="请选择类型">
            <el-option v-for="item in businessOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogType[dialogStatus]==='create'" label="密码" prop="password">
          <el-input v-model="accountTemp.password" type="password"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogType[dialogStatus]==='create'" label="确认密码" prop="confirmPassword">
          <el-input v-model="accountTemp.confirmPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="accountTemp.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createAccount">确认</el-button>
        <el-button v-else type="primary" @click="updateAccount">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import $axios from '@/utils/axios'
import { formatTimeStamp } from '@/utils/date'
import './account.scss'
export default {
  data() {
    return {
      formSearch: {
        loginId: '',
        name: '',
        currentPage: 1,
        size: 10
      },
      listLoading: false,
      dataList: [],
      total: 0,
      typeOptions: [
        {
          label: '超级管理员',
          value: 1
        },
        {
          label: '股东',
          value: 2
        },
        {
          label: '门店管理员',
          value: 3
        }
      ],
      businessOptions: [],
      dialogVisible: false,
      dialogStatus: 'create',
      dialogType: {
        create: '新增账户',
        update: '编辑账户'
      },
      rules: {
        loginId: [{ required: true, trigger: 'change', message: '请输入账户名' }],
        name: [{ required: true, trigger: 'change', message: '请输入昵称' }],
        type: [{ required: true, trigger: 'change', message: '请选择类型' }],
        password: [{ required: true, trigger: 'change', message: '请输入密码' }],
        confirmPassword: [{ required: true, trigger: 'change', message: '请输入确认密码' }]
      },
      accountTemp: this.initAccountTemp()
    }
  },
  filters: {
    activeFilter(active) {
      const statusMap = {
        0: 'danger',
        1: 'success'
      }
      return statusMap[active]
    },
    activeNameFilter(active) {
      const activeNameMap = {
        0: '已禁用',
        1: '已启用'
      }
      return activeNameMap[active]
    },
    businessFilter(type) {
      const businessMap = {
        2: '所有者',
        3: '门店'
      }
      return businessMap[type]
    }
  },
  created() {
    this.getAccountList()
  },
  methods: {
    handleSearch() {
      this.formSearch.currentPage = 1
      this.getAccountList()
    },
    handleCreate() {
      this.setAccountDialog('create', this.initAccountTemp())
    },
    handleUpdate(row) {
      const { password, type } = row
      this.getBusinessOptions(type)
      this.setAccountDialog('update', Object.assign({ confirmPassword: password }, row))
    },
    handleDelete() {},
    handleModifyActive(row) {
      const { active, adminId } = row
      const params = {
        adminId: adminId,
        active: active === 1 ? 0 : 1
      }
      $axios({
        url: '/api/v1/admin/setAdminStatus',
        method: 'post',
        params: params
      }).then(response => {
        row.active = params.active
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    getBusinessOptions(value) {
      switch (value) {
        case 2: // 股东
          this.getOrgOptions()
          break
        case 3: // 门店
          this.getStoreOptions()
          break
      }
    },
    createAccount() {
      this.$refs['accountForm'].validate(valid => {
        if (valid) {
          const { password, confirmPassword } = this.accountTemp
          if (password !== confirmPassword) {
            this.$message({
              message: '密码与确认密码不一致',
              type: 'warning'
            })
            return
          }
          $axios({
            url: '/api/v1/admin/addAdmin',
            method: 'post',
            data: this.accountTemp
          }).then(() => {
            this.dataList.unshift(this.accountTemp)
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
    updateAccount() {
      this.$refs['accountForm'].validate(valid => {
        if (valid) {
          const { password, confirmPassword, ...data } = this.accountTemp
          $axios({
            url: '/api/v1/admin/editAdmin',
            method: 'post',
            data: data
          }).then(() => {
            for (const v of this.dataList) {
              if (v.adminId === data.adminId) {
                const index = this.dataList.indexOf(v)
                this.dataList.splice(index, 1, data)
                break
              }
            }

            this.dialogVisible = false
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
    setAccountDialog(dialogStatus, data) {
      this.dialogStatus = dialogStatus
      this.accountTemp = data
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['accountForm'].clearValidate()
      })
    },
    getAccountList() {
      this.listLoading = true
      $axios({
        url: '/api/v1/admin/queryAdminList',
        method: 'get',
        params: this.formSearch
      }).then(response => {
        this.listLoading = false
        const { resultObj, totalSize } = response.data
        this.dataList = resultObj
        this.total = totalSize
      })
    },
    // 查询所有者下拉选项
    getOrgOptions() {
      $axios({
        method: 'get',
        url: '/api/v1/store/queryOrgList'
      })
        .then(response => {
          const { resultObj } = response.data
          if (resultObj && Array.isArray(resultObj)) {
            this.businessOptions = resultObj.map(item => {
              const { organizationId, ownerName, ...anyprops } = item
              return {
                label: ownerName,
                value: organizationId,
                ...anyprops
              }
            })
          }
        })
        .catch(error => {
          this.businessOptions = []
        })
    },
    getStoreOptions() {
      $axios({
        method: 'get',
        url: '/api/v1/store/queryStoreAll'
      })
        .then(response => {
          const { resultObj } = response.data
          if (resultObj && Array.isArray(resultObj)) {
            this.businessOptions = resultObj.map(item => {
              const { storeName, storeId, ...anyprops } = item
              return {
                label: storeName,
                value: storeId,
                ...anyprops
              }
            })
          }
        })
        .catch(error => {
          this.businessOptions = []
        })
    },
    formatType(row, column, cellValue) {
      const typeMap = {
        1: '超级管理员',
        2: '股东',
        3: '门店管理员'
      }
      return typeMap[cellValue]
    },
    formatTime(row, column, cellValue) {
      return formatTimeStamp(cellValue)
    },
    initAccountTemp() {
      return {
        active: 1,
        businessId: '',
        email: '',
        loginId: '',
        name: '',
        password: '',
        confirmPassword: '',
        type: ''
      }
    }
  }
}
</script>

