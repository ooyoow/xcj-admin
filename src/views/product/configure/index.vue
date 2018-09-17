<template>
  <div class="product-develop-configure">
    <el-steps class="steps" :active="stepActive" finish-status="success">
      <el-step title="选择产品分类"></el-step>
      <el-step title="填写产品信息"></el-step>
      <el-step title="配置成功"></el-step>
    </el-steps>
    <el-form class="data-form" ref="formProduct" :rules="rules" :model="fromProduct" label-width="90px">
      <el-form-item label="产品分类" prop="pType">
        <el-select v-model="fromProduct.type" clearable placeholder="请选择活动区域" @input="onInputType">
          <el-option label="套餐" :value="1"></el-option>
          <el-option label="限次卡" :value="2"></el-option>
          <el-option label="优惠券" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item class="form-item" label="产品名称" prop="pname">
            <el-input v-model="fromProduct.pname" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="产品编号" prop="pcode">
            <el-input v-model="fromProduct.pcode" placeholder="请输入产品编号"></el-input>
          </el-form-item>
          <el-form-item label="售价" prop="price">
            <el-input v-model="fromProduct.price" placeholder="请输入售价"></el-input>
          </el-form-item>
          <el-form-item label="次数" prop="pnum">
            <el-input v-model="fromProduct.pnum" placeholder="请输入售价"></el-input>
          </el-form-item>
          <el-form-item label="推荐指数" prop="recommend">
            <el-input v-model="fromProduct.recommend" placeholder="请输入推荐指数"></el-input>
          </el-form-item>
          <el-form-item label="折扣率" prop="discountRate">
            <el-input v-model="fromProduct.discountRate" placeholder="请输入折扣率"></el-input>
          </el-form-item>
          <el-form-item label="上架时间" prop="upTime">
            <el-date-picker v-model="fromProduct.upTime" placeholder="请选择上架时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="样式" prop="style">
            <el-input v-model="fromProduct.style" placeholder="请选择样式"></el-input>
          </el-form-item>
          <el-form-item label="导航" prop="navigation">
            <el-input v-model="fromProduct.navigation" placeholder="请输入导航"></el-input>
          </el-form-item>
          <el-form-item label="优惠券模板" prop="pcouponId">
            <el-radio-group v-model="fromProduct.pcouponId">
              <el-radio v-for="item in couponTempOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="简介" prop="pcontent">
            <el-input v-model="fromProduct.pcontent" placeholder="请输入简介"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="form-item" label="产品品牌" prop="brand">
            <el-input v-model="fromProduct.brand" placeholder="请输入产品品牌"></el-input>
          </el-form-item>
          <el-form-item label="市场价" prop="marketPrice">
            <el-input v-model="fromProduct.marketPrice" placeholder="请输入市场价"></el-input>
          </el-form-item>
          <el-form-item label="发行量" prop="pAllnum">
            <el-input v-model="fromProduct.pAllnum" placeholder="请输入发行量"></el-input>
          </el-form-item>
          <!-- <el-form-item label="集团客户" prop="groupCustomer">
              <el-input v-model="fromProduct.groupCustomer" placeholder="请输入集团客户"></el-input>
            </el-form-item> -->
          <el-form-item label="赠送次数" prop="psendNum">
            <el-input v-model="fromProduct.psendNum" placeholder="请输入赠送次数"></el-input>
          </el-form-item>
          <el-form-item label="有效期" prop="pvalidateTime">
            <el-input v-model.number="fromProduct.pvalidateTime" placeholder="请输入有效期"></el-input>
          </el-form-item>
          <el-form-item label="洗车模式" prop="model">
            <el-input v-model="fromProduct.model" placeholder="请输入洗车模式"></el-input>
          </el-form-item>
          <el-form-item label="下架时间" prop="downTime">
            <el-date-picker v-model="fromProduct.downTime" placeholder="请选择上架时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="广告语" prop="advertisement">
            <el-input v-model="fromProduct.advertisement" placeholder="请输入广告语"></el-input>
          </el-form-item>
          <el-form-item label="产品详情" prop="details">
            <el-input v-model="fromProduct.details" placeholder="请输入产品详情"></el-input>
          </el-form-item>
          <el-form-item label="风格" prop="pcode">
            <el-radio-group v-model="fromProduct.pcode ">
              <el-radio :label="1">
                <span>
                  <img src="@/assets/images/style.png" />
                </span>
              </el-radio>
              <el-radio :label="2">
                <span>
                  <img src="@/assets/images/style.png" />
                </span>
              </el-radio>
              <el-radio :label="3">
                <span>
                  <img src="@/assets/images/style.png" />
                </span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button @click="resetForm('formProduct')">重置</el-button>
        <el-button type="primary" @click="submitForm('formProduct')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import $axios from '@/utils/axios'
import './configure.scss'
export default {
  name: 'configure',
  data() {
    return {
      stepActive: 0,
      couponTempOptions: [],
      fromProduct: {
        pType: 1, // 产品类别 （1:套餐卡，2:次卡，3:限次卡）
        advertisement: '', // 广告语
        pAllnum: '', // 预备发行量
        brand: '', // 商品品牌
        details: '', // 产品详情
        discountRate: '', // 折扣率
        upTime: '', // 上架时间
        downTime: '', // 下架时间
        groupCustomer: '', // 集团客户
        marketPrice: '', // 市场价
        model: '', // 模式
        navigation: '', //  导航
        pcode: '', // 产品编码
        pcontent: '', // 简介
        pcouponId: 0, // 优惠券Id
        pimg: '', // 产品图片
        pname: '', // 产品名称
        pnum: '', // 次数
        price: '', // 售价
        psendNum: 0, // 赠送数量
        pvalidateTime: '', // 有效期
        recommend: '', // 推荐指数 0-100
        style: '' // 样式
      },
      rules: {
        pType: [{ required: true, message: '终端名称不能为空', trigger: 'change' }],
        advertisement: [{ required: true, message: '广告语不能为空', trigger: 'change' }],
        pAllnum: [{ required: true, message: '发行量不能为空', trigger: 'change' }],
        brand: [{ required: true, message: '商品品牌不能为空', trigger: 'change' }],
        details: [{ required: true, message: '产品详情不能为空', trigger: 'change' }],
        discountRate: [{ required: true, message: '折扣率不能为空', trigger: 'change' }],
        upTime: [{ required: true, message: '上架时间不能为空', trigger: 'change' }],
        downTime: [{ required: true, message: '下架时间不能为空', trigger: 'change' }],
        // groupCustomer: [
        //   { required: true, message: "集团客户不能为空", trigger: "change" }
        // ],
        marketPrice: [{ required: true, message: '市场价不能为空', trigger: 'change' }],
        model: [{ required: true, message: '请选择模式', trigger: 'change' }],
        navigation: [{ required: true, message: '导航不能为空', trigger: 'change' }],
        pcode: [{ required: true, message: '请输入产品编号', trigger: 'change' }],
        pcontent: [{ required: true, message: '请输入简介', trigger: 'change' }],
        pcouponId: [{ required: true, message: '请选择优惠券模板', trigger: 'change' }],
        pimg: [{ required: true, message: '请选择风格', trigger: 'change' }],
        pname: [{ required: true, message: '请输入产品名称', trigger: 'change' }],
        pnum: [{ required: true, message: '请输入次数', trigger: 'change' }],
        price: [{ required: true, message: '售价不能为空', trigger: 'change' }],
        psendNum: [{ required: true, message: '请输入赠送次数', trigger: 'change' }],
        pvalidateTime: [{ required: true, message: '请选择有效期', trigger: 'change' }],
        recommend: [{ required: true, message: '请输入推荐指数', trigger: 'change' }],
        style: [{ required: true, message: '请选择样式', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getCouponTemp()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          $axios({
            url: '/api/v1/product/addProduct',
            method: 'post',
            data: this.fromProduct
          }).then(result => {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onInputType(value) {
      this.stepActive = value ? 1 : 0
    },
    getCouponTemp() {
      $axios({
        url: 'api/v1/templet/queryTemplet',
        method: 'get'
      }).then(result => {
        const { resultObj } = result.data
        this.couponTempOptions = resultObj.map(item => {
          return {
            label: item.couponName,
            value: item.id
          }
        })
      })
    }
  }
}
</script>

