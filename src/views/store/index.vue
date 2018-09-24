<template>
  <div :class="prefixCls">
    <el-form :inline="true" :model="formSearch">
      <el-form-item label="门店名称">
        <el-input clearable v-model="formSearch.storeName" placeholder="请输入门店名称搜索"></el-input>
      </el-form-item>
      <el-form-item label="门店状态">
        <el-select clearable v-model="formSearch.state" placeholder="请选择门店状态">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :class="`${prefixCls}-table`" border :data="storeList" v-loading="listLoading" tooltip-effect="dark">
      <el-table-column prop="storeName" align="center" label="门店名称" show-overflow-tooltip/>
      <el-table-column prop="storeManager" align="center" label="店长" show-overflow-tooltip/>
      <el-table-column prop="stateName" align="center" label="门店状态" show-overflow-tooltip/>
      <el-table-column prop="driverid" align="center" label="终端ID" show-overflow-tooltip/>
      <el-table-column prop="storePro" align="center" label="省份" show-overflow-tooltip/>
      <el-table-column prop="storeCity" align="center" label="城市" show-overflow-tooltip/>
      <el-table-column prop="address" align="center" label="地址" show-overflow-tooltip/>
      <el-table-column prop="storeIcon" align="center" label="店铺图标" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-popover v-if="scope.row.storeIcon" placement="right" trigger="hover">
            <img style="width: 150px; height: 150px" :src="`${$base_url}/${scope.row.storeIcon}`" />
            <span slot="reference" class="column-img">预览</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="storeImg" align="center" label="店铺图片" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-popover v-if="scope.row.storeImg" placement="right" trigger="hover">
            <img style="width: 150px; height: 150px" :src="`${$base_url}/${scope.row.storeImg}`" />
            <span slot="reference" class="column-img">预览</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="storeDesc" label="描述" show-overflow-tooltip/>
      <el-table-column prop="remarks" label="备注" show-overflow-tooltip/>
      <el-table-column prop="createTime" align="center" label="添加时间" show-overflow-tooltip :formatter="formatTime" />
      <el-table-column prop="updateTime" align="center" label="更新时间" show-overflow-tooltip :formatter="formatTime" />
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row.storeId)">删除</el-button>
          <!-- <el-popover placement="top" v-model="deletePopoverVisible">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button type="text" @click="deletePopover.delete(scope.row.storeId)">取消</el-button>
              <el-button type="primary" @click="handleDelete(scope.row.storeId)">确定</el-button>
            </div>
            <el-button type="text" slot="reference" @click="deletePopoverVisible = true">删除</el-button>
          </el-popover> -->
        </template>
      </el-table-column>
    </el-table>
    <div :class="`${prefixCls}-pagination`">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="dialogType[dialogStatus]" :visible.sync="dialogVisible">
      <el-form :rules="rules" ref="dataForm" :model="storeTemp" label-position="right" label-width="100px">
        <el-form-item label="门店名称" prop="storeName">
          <el-input v-model="storeTemp.storeName" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="店长" prop="storeManager">
          <el-input v-model="storeTemp.storeManager" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="门店状态" prop="state">
          <el-select class="filter-item" v-model="storeTemp.state" placeholder="请选择门店状态">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="终端ID" prop="driverid">
          <el-select class="filter-item" v-model="storeTemp.driverid" multiple placeholder="请选择终端名称">
            <el-option v-for="item in terminalUnboundOptios" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="省份" prop="storePro">
          <el-input v-model="storeTemp.storePro" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="storeCity">
          <el-input v-model="storeTemp.storeCity" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="storeTemp.address" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="storeLocationX">
          <el-input type="number" v-model.number="storeTemp.storeLocationX"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="storeLocationY">
          <el-input type="number" v-model.number="storeTemp.storeLocationY"></el-input>
        </el-form-item>
        <el-form-item label="店铺图标" prop="storeIcon" ref="storeIcon">
          <el-upload v-model="storeTemp.storeIcon" :action="`${$base_url}/api/v1/store/upload`" :limit="1" :on-success="onSuccessStoreIcon" :on-error="this.onUploadError">
            <el-button size="small" type="primary">点击上传</el-button>&nbsp;&nbsp;
            <span slot="tip">只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片" prop="storeImg" ref="storeImg">
          <el-upload v-model="storeTemp.storeImg" :action="`${$base_url}/api/v1/store/upload`" :limit="1" :on-success="onSuccessStoreImg" :on-error="this.onUploadError">
            <el-button type="primary">点击上传</el-button>&nbsp;&nbsp;
            <span slot="tip">只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="所有者" prop="ownerList">
          <el-select multiple v-model="storeTemp.ownerList" placeholder="请选择所有者">
            <el-option v-for="item in orgOptions" :key="item.organizationId" :label="item.ownerName" :value="item.organizationId"></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="添加时间" prop="createTime">
          <el-date-picker v-model="storeTemp.createTime" type="datetime" placeholder="请选择时间"></el-date-picker>
        </el-form-item> -->
        <el-form-item label="广告语" prop="advertisement">
          <el-input v-model="storeTemp.advertisement" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="storeDesc">
          <el-input v-model="storeTemp.storeDesc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" maxlength="200" placeholder="请输入描述">
          </el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="storeTemp.remarks" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" maxlength="200" placeholder="请输入备注">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createStore">确认</el-button>
        <el-button v-else type="primary" @click="updateStore">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import $axios from '@/utils/axios'
import { formatTimeStamp } from '@/utils/date'
import BASE_URL from '../../../config/serve'
import './store.scss'
export default {
  name: 'store',
  data() {
    return {
      prefixCls: 'xcj-store',
      BASE_URL: BASE_URL,
      formSearch: {
        storeName: '',
        state: '',
        sort: ''
      },
      listQuery: {
        currentPage: 1,
        size: 10
      },
      listLoading: false,
      storeList: [],
      total: 0,
      deletePopover: new Map(),
      terminalUnboundOptios: [],
      // 新增/编辑对话框相关
      dialogVisible: false,
      dialogStatus: 'create',
      dialogType: {
        create: '新增',
        update: '编辑'
      },
      statusOptions: [
        {
          label: '营业',
          value: 'business'
        },
        {
          label: '暂停营业',
          value: 'suspend'
        },
        {
          label: '在建',
          value: 'build'
        }
      ],
      rules: {
        storeName: [{ required: true, message: '门店名称不能为空', trigger: 'change' }],
        storeManager: [{ required: true, message: '店长不能为空', trigger: 'change' }],
        state: [{ required: true, message: '门店状态不能为空', trigger: 'change' }],
        storePro: [{ required: true, message: '省份不能为空', trigger: 'change' }],
        storeCity: [{ required: true, message: '城市不能为空', trigger: 'change' }],
        address: [{ required: true, message: '地址不能为空', trigger: 'change' }],
        ownerList: [{ required: true, message: '所有者不能为空', trigger: 'change' }]
      },
      storeTemp: this.defaultStoreTemp()
    }
  },
  created() {
    this.getStore()
  },
  computed: {
    ...mapState({
      orgOptions: state => state.common.orgOptions
    })
  },
  methods: {
    ...mapActions(['getOrgOptions']),
    // 查询门店
    getStore() {
      this.listLoading = true
      const params = Object.assign({}, this.formSearch, this.listQuery)
      $axios({
        url: '/api/v1/store/queryStoreList',
        method: 'get',
        params: params
      })
        .then(response => {
          this.listLoading = false
          const { resultObj, totalSize } = response
          this.storeList = resultObj
          this.total = totalSize
        })
        .catch(error => {
          this.listLoading = false
        })
    },
    //  查询未绑定的门店
    getTerminalUnbound(callback) {
      $axios({
        url: '/api/v1/driver/queryDriverUnbound',
        method: 'get'
      }).then(response => {
        const { resultObj } = response
        let data = []
        if (resultObj && Array.isArray(resultObj)) {
          data = resultObj.map(item => {
            return item.driverid
          })
        }
        if (callback && typeof callback === 'function') {
          callback(data)
        }
      })
    },
    handleCurrentChange(value) {
      this.listQuery.currentPage = value
      this.getStore()
    },
    handleSizeChange(value) {
      this.listQuery.size = value
      this.getStore()
    },
    handleSearch() {
      this.getStore()
    },
    handleCreate() {
      this.storeTemp = this.defaultStoreTemp()
      this.dialogStatus = 'create'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.getOrgOptions()
      this.getTerminalUnbound(data => {
        this.terminalUnboundOptios = data
      })
    },
    handleUpdate(row) {
      const { driverid, ownerList, ...others } = row
      const arrDriverid = driverid ? driverid.split(',') : []
      const formatOwnerList = ownerList && Array.isArray(ownerList) ? ownerList.map(item => item.organizationId) : []
      this.storeTemp = {
        driverid: arrDriverid,
        ownerList: formatOwnerList,
        ...others
      }
      this.dialogStatus = 'update'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.getOrgOptions()
      this.getTerminalUnbound(data => {
        this.terminalUnboundOptios = arrDriverid.concat(data)
      })
    },
    handleDelete(storeId) {
      $axios({
        url: '/api/v1/store/deleteStore',
        method: 'post',
        data: { storeId }
      }).then(response => {
        for (const v of this.storeList) {
          if (v.storeId === storeId) {
            const index = this.storeList.indexOf(v)
            this.storeList.splice(index, 1)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            break
          }
        }
      })
    },
    createStore() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const { driverid, ownerList, ...others } = this.storeTemp
          const driveridToString = this.storeTemp.driverid.toString()
          const fullOwnerList = this.orgOptions.filter(item => {
            return ownerList.includes(item.organizationId)
          })
          const data = {
            ...others,
            driverid: driveridToString,
            ownerList: fullOwnerList
          }
          console.log(data, 'data')
          $axios({
            url: '/api/v1/store/addStore',
            method: 'post',
            data: data
          }).then(response => {
            this.storeList.unshift(data)
            this.dialogVisible = false
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
    updateStore() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const { driverid, ownerList, ...others } = this.storeTemp
          const driveridToString = this.storeTemp.driverid.toString()
          const fullOwnerList = this.orgOptions.filter(item => {
            return ownerList.includes(item.organizationId)
          })
          const data = {
            driverid: driveridToString,
            ownerList: fullOwnerList,
            ...others
          }
          $axios({
            url: '/api/v1/store/editStore',
            method: 'post',
            data: data
          }).then(response => {
            for (const v of this.storeList) {
              if (v.storeId === data.storeId) {
                const index = this.storeList.indexOf(v)
                this.storeList.splice(index, 1, data)
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
    onSuccessStoreIcon(response, file, fileList) {
      this.storeTemp.storeIcon = response.resultObj
      this.$refs.storeIcon.clearValidate()
    },
    onSuccessStoreImg(response, file, fileList) {
      this.storeTemp.storeImg = response.resultObj
      this.$refs.storeImg.clearValidate()
    },
    onUploadError(err, file, fileList) {
      this.$message({
        message: err.message || '服务异常',
        type: 'error'
      })
    },
    defaultStoreTemp() {
      return {
        address: '',
        advertisement: '',
        createTime: '',
        driverid: '',
        remarks: '',
        state: '',
        storeCity: '',
        storeDesc: '',
        storeIcon: '',
        storeImg: '',
        storeLocationX: '',
        storeLocationY: '',
        storeManager: '',
        storeName: '',
        storeId: '',
        storePro: '',
        ownerList: []
      }
    },
    formatTime(row, column, cellValue) {
      return formatTimeStamp(cellValue)
    }
  }
}
</script>
