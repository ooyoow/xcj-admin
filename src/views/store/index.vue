<template>
  <div :class="prefixCls">
    <el-form
      :inline="true"
      :model="formSearch"
    >
      <el-form-item label="门店名称">
        <el-input
          clearable
          v-model="formSearch.storeName"
          placeholder="请输入门店名称搜索"
        ></el-input>
      </el-form-item>
      <el-form-item label="门店状态">
        <el-select
          clearable
          v-model="formSearch.state"
          placeholder="请选择门店状态"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleSearch"
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
      :data="storeList"
      v-loading="listLoading"
      tooltip-effect="dark"
    >
      <el-table-column
        prop="storeId"
        label="门店ID"
        width="60"
        show-overflow-tooltip
      />
      <el-table-column
        prop="storeName"
        label="门店名称"
        show-overflow-tooltip
      />
      <el-table-column
        prop="storeManager"
        label="店长"
        show-overflow-tooltip
      />
      <el-table-column
        prop="stateName"
        label="门店状态"
        show-overflow-tooltip
      />
      <el-table-column
        prop="ownerList"
        label="所有者"
        show-overflow-tooltip
        :formatter="formatOwner"
      />
      <el-table-column
        prop="driverid"
        label="终端ID"
        show-overflow-tooltip
      />
      <el-table-column
        prop="storePro"
        label="省份"
        show-overflow-tooltip
      />
      <el-table-column
        prop="storeCity"
        label="城市"
        show-overflow-tooltip
      />
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip
      />
      <el-table-column
        prop="storeIcon"
        align="center"
        label="店铺图标"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.storeIcon"
            placement="right"
            trigger="hover"
          >
            <div :class="`${prefixCls}-table-view-icon`">
              <img :src="scope.row.storeIcon" />
            </div>
            <span
              slot="reference"
              class="column-img"
            >预览</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="storeImg"
        align="center"
        label="店铺图片"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.storeImg"
            placement="right"
            trigger="hover"
          >
            <div :class="`${prefixCls}-table-view-img`">
              <img :src="scope.row.storeImg" />
            </div>
            <span
              slot="reference"
              class="column-img"
            >预览</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="advertisement"
        label="广告语"
        show-overflow-tooltip
      />
      <el-table-column
        prop="storeDesc"
        label="描述"
        show-overflow-tooltip
      />
      <el-table-column
        prop="remarks"
        label="备注"
        show-overflow-tooltip
      />
      <el-table-column
        prop="createTime"
        align="center"
        label="添加时间"
        show-overflow-tooltip
        :formatter="formatTime"
      />
      <el-table-column
        prop="updateTime"
        align="center"
        label="更新时间"
        show-overflow-tooltip
        :formatter="formatTime"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleOwnerProfit(scope.row.storeId)"
          >分润设置</el-button>
          <el-button
            type="text"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            @click="handleDelete(scope.row.storeId)"
          >删除</el-button>
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
      :class="`${prefixCls}-dialog`"
      :title="dialogType[dialogStatus]"
      :visible.sync="dialogVisible"
    >
      <el-form
        :rules="rules"
        ref="dataForm"
        :model="storeTemp"
        label-position="right"
        label-width="150px"
      >
        <el-form-item
          label="门店名称"
          prop="storeName"
        >
          <el-input
            v-model="storeTemp.storeName"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="门店状态"
          prop="state"
        >
          <el-select
            class="filter-item"
            v-model="storeTemp.state"
            placeholder="请选择门店状态"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="店长"
          prop="storeManager"
        >
          <el-input
            v-model="storeTemp.storeManager"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="所有者"
          prop="ownerList"
        >
          <el-select
            multiple
            v-model="storeTemp.ownerList"
            placeholder="请选择所有者"
          >
            <el-option
              v-for="item in orgOptions"
              :key="item.organizationId"
              :label="item.ownerName"
              :value="item.organizationId"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item
          v-for="(fraction, index) in storeTemp.fractions"
          :label="`[${fraction.ownerName}]分润比例`"
          :key="index"
          :prop="'fractions.' + index + '.value'"
          :rules="{required: true, message: '分润比例不能为空', trigger: 'change'}"
        >
          <el-input
            type="number"
            v-model.number="fraction.value"
          >
            <template slot="append">%</template>
          </el-input>
        </el-form-item> -->
        <el-form-item
          label="省份"
          prop="storePro"
        >
          <el-input
            v-model="storeTemp.storePro"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="城市"
          prop="storeCity"
        >
          <el-input
            v-model="storeTemp.storeCity"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="地址"
          prop="address"
        >
          <el-input
            v-model="storeTemp.address"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="经度"
          prop="storeLocationX"
        >
          <el-input
            type="number"
            v-model.number="storeTemp.storeLocationX"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="纬度"
          prop="storeLocationY"
        >
          <el-input
            type="number"
            v-model.number="storeTemp.storeLocationY"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="终端ID"
          prop="driverid"
        >
          <el-select
            class="filter-item"
            v-model="storeTemp.driverid"
            multiple
            placeholder="请选择终端名称"
          >
            <el-option
              v-for="item in terminalUnboundOptios"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="店铺图标"
          prop="storeIcon"
          ref="storeIcon"
        >
          <el-upload
            v-model="storeTemp.storeIcon"
            :file-list="storeIconFile"
            :action="`${$base_url}/api/v1/store/upload`"
            :limit="1"
            :on-success="onSuccessStoreIcon"
            :on-error="this.onUploadError"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>&nbsp;&nbsp;
            <span slot="tip">只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="店铺图片"
          prop="storeImg"
          ref="storeImg"
        >
          <el-upload
            v-model="storeTemp.storeImg"
            :file-list="storeImgFile"
            :action="`${$base_url}/api/v1/store/upload`"
            :limit="1"
            :on-success="onSuccessStoreImg"
            :on-error="this.onUploadError"
          >
            <el-button type="primary">点击上传</el-button>&nbsp;&nbsp;
            <span slot="tip">只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-form-item>

        <!-- <el-form-item label="添加时间" prop="createTime">
          <el-date-picker v-model="storeTemp.createTime" type="datetime" placeholder="请选择时间"></el-date-picker>
        </el-form-item> -->
        <el-form-item
          label="广告语"
          prop="advertisement"
        >
          <el-input
            type="textarea"
            v-model="storeTemp.advertisement"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          prop="storeDesc"
        >
          <el-input
            v-model="storeTemp.storeDesc"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            maxlength="200"
            placeholder="请输入描述"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="remarks"
        >
          <el-input
            v-model="storeTemp.remarks"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            maxlength="200"
            placeholder="请输入备注"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="createStore"
        >确认</el-button>
        <el-button
          v-else
          type="primary"
          @click="updateStore"
        >确认</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="设置所有者分润比例"
      :visible.sync="dialogOwnerVisible"
    >
      <el-table :data="ownerProfitList">
        <el-table-column
          property="ownerName"
          label="所有者"
        ></el-table-column>
        <el-table-column
          property="storeName"
          label="门店名称"
        ></el-table-column>
        <el-table-column
          property="rate"
          label="分润比例"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <div style="display: flex">
                <el-input-number
                  v-model="scope.row.rate"
                  :controls="false"
                  :min="0"
                  :max="1"
                ></el-input-number>
                <!-- <el-input
                  type="number"
                  :min="0"
                  :max="1"
                  size="small"
                  v-model="scope.row.rate"
                ></el-input> -->
                <el-button
                  size="small"
                  icon="el-icon-refresh"
                  type="warning"
                  @click="cancelEditProfit(scope.row)"
                >取消</el-button>
              </div>
            </template>
            <span v-else>{{ scope.row.rate }}</span>
          </template>

        </el-table-column>

        <el-table-column
          align="center"
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.edit"
              type="success"
              @click="confirmEditProfit(scope.row)"
              size="small"
              icon="el-icon-circle-check-outline"
            >保存</el-button>
            <el-button
              v-else
              type="primary"
              @click='scope.row.edit=!scope.row.edit'
              size="small"
              icon="el-icon-edit"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DateUtils from '@/utils/date'
import { interceptFileName } from '@/utils/general'
import BASE_URL from '../../../config/serve'
import './store.scss'
import {
  getStoreList,
  getTerminalUnbound,
  addStore,
  editStore,
  deleteStore,
  getOwnerProfitByStoreId,
  setOwnerProfitByStoreId
} from '@/service/store'
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
      storeTemp: this.defaultStoreTemp(),
      storeIconFile: [],
      storeImgFile: [],
      dialogOwnerVisible: false,
      ownerProfitList: []
    }
  },
  created() {
    this.queryStoreList()
  },
  computed: {
    ...mapState({
      orgOptions: state => state.common.orgOptions
    })
  },
  methods: {
    ...mapActions(['getOrgOptions']),

    // 查询门店
    queryStoreList() {
      const params = Object.assign({}, this.formSearch, this.listQuery)
      this.listLoading = true
      getStoreList(params)
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

    //  查询未绑定的终端
    queryTerminalUnbound(callback) {
      getTerminalUnbound().then(response => {
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
      this.queryStoreList()
    },

    handleSizeChange(value) {
      this.listQuery.size = value
      this.queryStoreList()
    },

    handleSearch() {
      this.queryStoreList()
    },

    // 添加门店
    handleCreate() {
      this.storeTemp = this.defaultStoreTemp()
      this.dialogStatus = 'create'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.getOrgOptions()
      this.queryTerminalUnbound(data => {
        this.terminalUnboundOptios = data
      })
    },

    // 编辑门店
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogVisible = true
      const { driverid, ownerList, storeIcon, storeImg, ...others } = row
      this.storeIconFile = storeIcon ? [{ name: interceptFileName(storeIcon), url: storeIcon }] : []
      this.storeImgFile = storeImg ? [{ name: interceptFileName(storeImg), url: storeImg }] : []
      const arrDriverid = driverid ? driverid.split(',') : []
      const formatOwnerList = ownerList && Array.isArray(ownerList) ? ownerList.map(item => item.organizationId) : []
      this.storeTemp = {
        driverid: arrDriverid,
        ownerList: formatOwnerList,
        ...others
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.getOrgOptions()
      this.queryTerminalUnbound(data => {
        this.terminalUnboundOptios = arrDriverid.concat(data)
      })
    },

    // 删除门店
    handleDelete(storeId) {
      deleteStore(storeId).then(response => {
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

    // 选择所有者
    handleSelectOwner(val) {
      // 添加
      if (val.length > this.storeTemp.fractions.length) {
        const result = this.orgOptions.find(item => item.organizationId === val[val.length - 1])
        if (result) {
          this.storeTemp.fractions.push({ ...result, value: '' })
        }
      } else {
        this.storeTemp.fractions = this.storeTemp.fractions.filter(item => val.includes(item.organizationId))
      }
    },

    handleRemoveOwner(val) {
      this.storeTemp.fractions = this.storeTemp.fractions.filter(item => item.organizationId !== val)
    },

    // 所有者分润设置
    handleOwnerProfit(storeId) {
      this.dialogOwnerVisible = true
      getOwnerProfitByStoreId(storeId).then(response => {
        const { resultObj } = response
        this.ownerProfitList = resultObj.map(item => {
          this.$set(item, 'edit', false)
          item.originalRate = item.rate
          return item
        })
        console.log(this.ownerProfitList, 'this.ownerProfitList')
      })
    },

    // 更新所有者分润设置
    confirmEditProfit(row) {
      const { storeId, organizationId, rate, originalRate } = row
      const params = {
        storeId,
        organizationId,
        rate
      }
      console.log(params, 'params')
      setOwnerProfitByStoreId(params).then(response => {
        row.originalRate = rate
        row.edit = false
      })
    },

    // 取消编辑所有者分润
    cancelEditProfit(row) {
      row.rate = row.originalRate
      row.edit = false
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
          addStore(data).then(response => {
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
          editStore(data).then(response => {
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
        ownerList: [],
        fractions: [] // 分润比例
      }
    },
    formatTime(row, column, cellValue) {
      return DateUtils.format(cellValue)
    },
    formatOwner(row, column, cellValue) {
      if (cellValue && Array.isArray(cellValue)) {
        return cellValue.map(item => item.ownerName).toString()
      }
    }
  }
}
</script>
