<template>
  <div :class="prefixCls">
    <el-form :inline="true">
      <el-form-item label="所有者">
        <el-input
          clearable
          v-model="listQuery.ownerName"
          placeholder="请输入所有者查询"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="queryOwnerList"
        >查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="handleCreate"
        >添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :class="`${prefixCls}-table`"
      :data="list"
      v-loading="listLoading"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            border
            :data="props.row.storeOrganizationList"
          >
            <el-table-column
              prop="storeName"
              label="门店名称"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="rate"
              label="分润比例"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="updateUser"
              label="更新人"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间"
              align="center"
              :formatter="formatTime"
            >
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        prop="organizationId"
        label="ID"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="ownerName"
        label="所有者名称"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="level"
        label="级别"
        align="center"
        show-overflow-tooltip
        :formatter="formatLevel"
      />
      <el-table-column
        prop="active"
        label="状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.active | activeFilter">{{scope.row.active | activeFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createUser"
        label="创建人"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        show-overflow-tooltip
        :formatter="formatTime"
      />
      <el-table-column
        prop="updateUser"
        label="更新人"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="updateTime"
        label="更新时间"
        align="center"
        show-overflow-tooltip
        :formatter="formatTime"
      />
      <el-table-column
        prop="descri"
        label="备注"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="handleDelete(scope.row.organizationId)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div :class="`${prefixCls}-pagination`">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.currentPage"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="dialogType[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :rules="rules"
        ref="dataForm"
        :model="ownerTemp"
        label-position="right"
        label-width="100px"
      >
        <el-form-item
          label="所有者名称"
          prop="ownerName"
        >
          <el-input v-model="ownerTemp.ownerName" />
        </el-form-item>
        <el-form-item
          label="级别"
          prop="level"
        >
          <el-select
            v-model="ownerTemp.level"
            placeholder="请选择级别"
          >
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="descri"
        >
          <el-input v-model="ownerTemp.descri"></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="createOwner"
        >确认</el-button>
        <el-button
          v-else
          type="primary"
          @click="updateOwner"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { expandParams } from '@/utils/general'
import DateUtils from '@/utils/date'
import './owner.scss'
import { getOwnerList, addOwner, editOwner, deleteOwner } from '@/service/owner'
export default {
  name: 'Owner',
  data() {
    return {
      prefixCls: 'xcj-owner',
      listQuery: {
        ownerName: '',
        currentPage: 1,
        size: 10
      },
      listLoading: false,
      list: [],
      total: 0,
      levelOptions: [
        {
          label: '一级',
          value: 1
        },
        {
          label: '二级',
          value: 2
        }
      ],
      // 新增/编辑对话框相关
      dialogFormVisible: false,
      dialogStatus: 'create',
      dialogType: {
        create: '新增',
        update: '编辑'
      },
      rules: {
        ownerName: [{ required: true, message: '所有者名称不能为空', trigger: 'change' }],
        level: [{ required: true, message: '请选择级别', trigger: 'change' }]
      },
      ownerTemp: this.defaultOwnerTemp()
    }
  },
  created() {
    this.queryOwnerList()
  },
  methods: {
    handleCreate() {
      this.ownerTemp = this.defaultOwnerTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      const { organizationId, ownerName, level, descri } = row
      this.ownerTemp = { organizationId, ownerName, level, descri }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(organizationId) {
      deleteOwner(organizationId).then(() => {
        for (const v of this.list) {
          if (v.organizationId === organizationId) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1)
            this.total = this.total - 1
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            break
          }
        }
      })
    },
    handleSizeChange(size) {
      this.listQuery.size = value
      this.queryOwnerList()
    },
    handleCurrentChange(page) {
      this.listQuery.currentPage = page
      this.queryOwnerList()
    },
    queryOwnerList() {
      const { ownerName, currentPage, size } = this.listQuery
      this.listLoading = true
      getOwnerList(ownerName, currentPage, size)
        .then(response => {
          this.listLoading = false
          const { resultObj, totalSize } = response
          this.list = resultObj
          this.total = totalSize
        })
        .catch(error => {
          this.listLoading = false
        })
    },
    createOwner() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          addOwner(this.ownerTemp).then(result => {
            this.list.unshift(result.resultObj)
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
    updateOwner() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const data = Object.assign({}, this.ownerTemp)
          editOwner(data).then(result => {
            for (const v of this.list) {
              if (v.organizationId === data.organizationId) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, result.resultObj)
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
    // 分页显示订单数据
    calcOrderList(data) {
      const { list, currentPage, size } = data
      return list.slice((currentPage - 1) * size, currentPage * size)
    },
    formatTime(row, column, cellValue) {
      return DateUtils.format(cellValue)
    },
    formatLevel(row, column, cellValue) {
      const levelMap = {
        1: '一级',
        2: '二级'
      }
      return levelMap[cellValue]
    },

    defaultOwnerTemp() {
      return {
        descri: '',
        level: '',
        ownerName: ''
      }
    }
  },
  filters: {
    activeFilter(active) {
      const activeMap = {
        0: '无效',
        1: '有效'
      }
      return activeMap[active]
    }
  }
}
</script>
