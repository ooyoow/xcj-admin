<template>
  <div :class="prefixCls">
    <div class="filter-container">
      <div class="filter-item">
        <el-input class="txt" v-model="listQuery.search" clearable @input="handleSearch" placeholder="输入限次卡名称/产品ID搜索"></el-input>
        <el-button type="primary" @click="handleCreate">添加</el-button>
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
    <el-table :class="`${prefixCls}-table`" border :data="dataList" tooltip-effect="dark">
      <el-table-column prop="pName" label="限次卡名称" show-overflow-tooltip />
      <el-table-column prop="pCode" label="产品编号" show-overflow-tooltip />
      <el-table-column prop="pImg" align="center" label="产品图片" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-popover placement="right" trigger="hover">
            <img style="width: 150px; height: 150px" :src="`${$base_url}/${scope.row.storeImg}`" />
            <span slot="reference" class="column-img">预览</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="marketPrice" align="center" label="市场价" show-overflow-tooltip />
      <el-table-column prop="pRice" align="center" label="售价" show-overflow-tooltip />
      <el-table-column prop="pNum" label="次数" align="center" show-overflow-tooltip />
      <el-table-column prop="pAllnum" label="发行量" align="center" show-overflow-tooltip />
      <el-table-column prop="pShowState" label="状态" align="center" show-overflow-tooltip />
      <el-table-column prop="advertisement" label="广告语" show-overflow-tooltip />
      <el-table-column prop="pContent" label="简介" show-overflow-tooltip />
      <el-table-column prop="remarks" label="备注" show-overflow-tooltip />
      <!-- <el-table-column prop="groupCustomer" label="集团客户" show-overflow-tooltip /> -->
      <el-table-column fixed="right" label="操作" align="center" width="100 ">
        <template slot-scope="scope">
          <el-button type="text" @click="handleUpdate(scope.row) ">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row.id) ">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div :class="`${prefixCls}-pagination`">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :class="`${prefixCls}-dialog`" :title="dialogType[dialogStatus]" :visible.sync="dialogVisible">
      <el-form :rules="rules" ref="dataForm" :model="dataTemp" label-position="right" label-width="100px">
        <el-form-item label="限次卡名称" prop="pName">
          <el-input v-model="dataTemp.pName"></el-input>
        </el-form-item>
        <el-form-item label="产品编号" prop="pCode">
          <el-input v-model="dataTemp.pCode"></el-input>
        </el-form-item>
        <el-form-item label="市场价" prop="marketPrice">
          <el-input v-model.number="dataTemp.marketPrice"></el-input>
        </el-form-item>
        <el-form-item label="售价" prop="pRice">
          <el-input v-model.number="dataTemp.pRice"></el-input>
        </el-form-item>
        <el-form-item label="次数" prop="pNum">
          <el-input v-model.number="dataTemp.pNum"></el-input>
        </el-form-item>
        <el-form-item label="发行量" prop="pAllnum">
          <el-input v-model="dataTemp.pAllnum"></el-input>
        </el-form-item>
        <el-form-item label="推荐指数" prop="pRecommond">
          <el-input v-model.number="dataTemp.pRecommond"></el-input>
        </el-form-item>
        <el-form-item label="产品图片" prop="pImg" ref="pImg">
          <el-upload v-model="dataTemp.pImg" :action="`${$base_url}/api/v1/store/upload`" :limit="1" :file-list="pImgList" :on-success="onUploadSuccess" :on-error="this.onUploadError">
            <el-button type="primary">点击上传</el-button>&nbsp;&nbsp;
            <span slot="tip">只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="广告语" prop="advertisement">
          <el-input v-model="dataTemp.advertisement"></el-input>
        </el-form-item>
        <!-- <el-form-item label="集团客户" prop="groupCustomer">
          <el-input v-model="dataTemp.groupCustomer"></el-input>
        </el-form-item> -->
        <el-form-item label="上架时间" prop="upTime">
          <el-date-picker v-model="dataTemp.upTime" type="datetime" placeholder="请上架时间" />
        </el-form-item>
        <el-form-item label="下架时间" prop="downTime">
          <el-date-picker v-model="dataTemp.downTime" type="datetime" placeholder="请下架时间" />
        </el-form-item>
        <el-form-item label="有效期" prop="pValidateTime">
          <el-input v-model.number="dataTemp.pValidateTime" placeholder="请输入有效期/天"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="pContent">
          <el-input v-model="dataTemp.pContent"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="dataTemp.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createPackage">确认</el-button>
        <el-button v-else type="primary" @click="updatePackage">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import $axios from '@/utils/axios'
import './card.scss'
export default {
  name: 'card',
  data() {
    return {
      prefixCls: 'xcj-product-card',
      listQuery: {
        search: '',
        type: 1,
        currentPage: 1,
        size: 10,
        productStatus: '',
        sort: ''
      },
      stats: {
        onlineNumber: 0,
        warehouseNumber: 0,
        count: 0
      },
      dataList: [],
      total: 0,
      dialogStatus: 'create',
      dialogType: {
        create: '新增限次卡',
        update: '编辑限次卡'
      },
      dialogVisible: false,
      pImgList: [],
      dataTemp: this.defaultTemp(),
      rules: {
        pName: [{ required: true, message: '限次卡名称不能为空', trigger: 'change' }],
        pCode: [{ required: true, message: '产品编号不能为空', trigger: 'change' }],
        marketPrice: [{ required: true, message: '市场价不能为空', trigger: 'change' }],
        pRice: [{ required: true, message: '产品售价不能为空', trigger: 'change' }],
        pNum: [{ required: true, message: '次数不能为空', trigger: 'change' }],
        pAllnum: [{ required: true, message: '发行量不能为空', trigger: 'change' }],
        pRecommond: [{ required: true, message: '推荐指数不能为空', trigger: 'change' }],
        pImg: [{ required: true, message: '产品图片不能为空', trigger: 'change' }],
        advertisement: [{ required: true, message: '广告语不能为空', trigger: 'change' }],
        upTime: [{ required: true, message: '上架时间不能为空', trigger: 'change' }],
        downTime: [{ required: true, message: '下架时间不能为空', trigger: 'change' }],
        pValidateTime: [{ required: true, message: '有效期不能为空', trigger: 'change' }],
        pContent: [{ required: true, message: '简介不能为空', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getDataList()
    this.getProductStatsByType({
      params: { type: 1 },
      callback: data => {
        const { onlineNumber, warehouseNumber } = data
        this.stats = {
          onlineNumber: onlineNumber,
          warehouseNumber: warehouseNumber,
          count: onlineNumber + warehouseNumber
        }
      }
    })
  },
  methods: {
    ...mapActions(['getProduct', 'getProductStatsByType', 'createProduct', 'updateProduct', 'deleteProduct']),
    getDataList() {
      this.getProduct({
        params: this.listQuery,
        callback: result => {
          const { list, total } = result
          this.dataList = list
          this.total = total
        }
      })
    },
    onRadioChange() {
      this.getDataList()
    },
    handleSearch(value) {
      this.getDataList()
    },
    handleCurrentChange(value) {
      this.listQuery.currentPage = value
      this.getDataList()
    },
    handleSizeChange(value) {
      this.listQuery.size = value
      this.getDataList()
    },
    handleCreate() {
      this.setDialog('create', this.defaultTemp())
    },
    handleUpdate(row) {
      const { pImg } = row
      this.pImgList = pImg ? [{ name: 'pImg.jpg', url: pImg }] : []
      this.setDialog('update', row)
    },
    handleDelete(id) {
      this.deleteProduct({
        id: id,
        callback: result => {
          for (const p of this.dataList) {
            if (p.id === id) {
              const index = this.dataList.indexOf(p)
              this.dataList.splice(index, 1)
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              break
            }
          }
        }
      })
    },
    createPackage() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.createProduct({
            params: this.dataTemp,
            callback: result => {
              if (result && result.data && result.data.success) {
                this.dataList.unshift(result.data.resultObj)
                this.dialogVisible = false
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success',
                  duration: 2000
                })
              }
            }
          })
        }
      })
    },
    updatePackage() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.updateProduct({
            params: this.dataTemp,
            callback: result => {
              if (result && result.data && result.data.success) {
                for (const v of this.dataList) {
                  if (v.id === this.dataTemp.id) {
                    const index = this.dataList.indexOf(v)
                    this.dataList.splice(index, 1, this.dataTemp)
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
              }
            }
          })
        }
      })
    },
    onUploadSuccess(response, file, fileList) {
      this.dataTemp.pImg = response.resultObj
      this.$refs.pImg.clearValidate()
    },
    onUploadError() {
      this.$message({
        message: err.message || '服务异常',
        type: 'error'
      })
    },
    setDialog(dialogStatus, data) {
      this.dialogStatus = dialogStatus
      this.dataTemp = data
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    defaultTemp() {
      return {
        pType: 2,
        pName: '',
        pCode: '',
        marketPrice: '',
        pRice: '',
        pNum: '',
        pAllnum: '',
        pRecommond: '',
        pImg: '',
        advertisement: '',
        upTime: '',
        downTime: '',
        pValidateTime: '',
        pContent: '',
        remarks: ''
      }
    }
  }
}
</script>
