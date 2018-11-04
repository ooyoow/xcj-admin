<template>
  <div :class="prefixCls">
    <el-steps
      class="steps"
      :active="stepActive"
    >
      <el-step title="选择产品分类"></el-step>
      <el-step title="填写产品信息"></el-step>
      <el-step title="配置成功"></el-step>
    </el-steps>
    <div class="content">
      <div class="title">{{stepTitle()}}</div>
      <div
        class="step-one"
        v-if="stepActive === 1"
      >
        <ul class="product-list">
          <li
            class="product-item"
            @click="handleProductType(0)"
          >
            <div>套餐</div>
            <div v-if="fromProduct.pType===0">
              <i class="el-icon-check"></i>
            </div>
          </li>
          <li
            class="product-item"
            @click="handleProductType(1)"
          >
            <div>限次卡</div>
            <div v-if="fromProduct.pType===1">
              <i class="el-icon-check"></i>
            </div>
          </li>
          <li
            class="product-item"
            @click="handleProductType(2)"
          >
            <div>优惠券</div>
            <div v-if="fromProduct.pType===2">
              <i class="el-icon-check"></i>
            </div>
          </li>
        </ul>
        <div class="action">
          <el-button
            type="primary"
            :disabled="[0, 1, 2].indexOf(fromProduct.pType) < 0"
            @click="handleNext(2)"
          >下一步，填写产品信息</el-button>
        </div>
      </div>
      <div
        class="step-two"
        v-if="stepActive === 2"
      >
        <el-form
          class="data-form"
          ref="formProduct"
          :rules="rules"
          :model="fromProduct"
          label-width="100px"
        >

          <el-row>
            <el-col :span="12">
              <el-form-item
                class="form-item"
                label="产品名称"
                prop="pName"
              >
                <el-input
                  v-model="fromProduct.pName"
                  placeholder="请输入商品名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                class="form-item"
                label="产品品牌"
                prop="brand"
              >
                <el-input
                  v-model="fromProduct.brand"
                  placeholder="请输入产品品牌"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="产品编号"
                prop="pCode"
              >
                <el-input
                  v-model="fromProduct.pCode"
                  placeholder="请输入产品编号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="市场价"
                prop="marketPrice"
              >
                <el-input
                  type="number"
                  v-model.number="fromProduct.marketPrice"
                  placeholder="请输入市场价"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="售价"
                prop="pRice"
              >
                <el-input
                  v-model="fromProduct.pRice"
                  placeholder="请输入售价"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="发行量"
                prop="pAllnum"
              >
                <el-input
                  type="number"
                  v-model.number="fromProduct.pAllnum"
                  placeholder="请输入发行量"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="次数"
                prop="pNum"
              >
                <el-input
                  type="number"
                  v-model.number="fromProduct.pNum"
                  placeholder="请输入售价"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="赠送次数"
                prop="pSendNum"
              >
                <el-input
                  type="number"
                  v-model.number="fromProduct.pSendNum"
                  placeholder="请输入赠送次数"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="推荐指数"
                prop="recommend"
              >
                <el-input
                  type="number"
                  v-model.number="fromProduct.recommend"
                  placeholder="请输入推荐指数"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="有效期"
                prop="pValidateTime"
              >
                <el-input
                  type="number"
                  v-model.number="fromProduct.pValidateTime"
                  placeholder="请输入有效期/天"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="折扣率"
                prop="discountRate"
              >
                <el-input
                  type="number"
                  v-model.number="fromProduct.discountRate"
                  placeholder="请输入折扣率"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="洗车模式"
                prop="model"
              >
                <el-select
                  v-model="fromProduct.model"
                  placeholder="请选择洗车模式"
                >
                  <el-option
                    v-for="mode in washModeOptions"
                    :key="mode.value"
                    :label="mode.label"
                    :value="mode.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="上架时间"
                prop="upTime"
              >
                <el-date-picker
                  v-model="fromProduct.upTime"
                  placeholder="请选择上架时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="下架时间"
                prop="downTime"
              >
                <el-date-picker
                  v-model="fromProduct.downTime"
                  placeholder="请选择下架时间"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="导航"
                prop="navigation"
              >
                <el-input
                  v-model="fromProduct.navigation"
                  placeholder="请输入导航"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="广告语"
                prop="advertisement"
              >
                <el-input
                  v-model="fromProduct.advertisement"
                  placeholder="请输入广告语"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="简介"
                prop="pContent"
              >
                <el-input
                  v-model="fromProduct.pContent"
                  placeholder="请输入简介"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="产品详情"
                prop="details"
              >
                <el-input
                  v-model="fromProduct.details"
                  placeholder="请输入产品详情"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            v-if="fromProduct.pType === 2"
            label="优惠券模板"
            prop="pCouponId"
          >
            <el-radio-group v-model="fromProduct.pCouponId">
              <el-radio
                v-for="item in couponTempOptions"
                :key="item.value"
                :label="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-else
            label="风格"
            prop="style"
          >
            <el-radio-group v-model="fromProduct.style ">
              <el-radio :label="0">
                <span>
                  <img src="@/assets/images/style.png" />
                </span>
              </el-radio>
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
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="action">
          <el-button
            plain
            :disabled="[0, 1, 2].indexOf(fromProduct.pType) < 0"
            @click="handlePrevious(1)"
          >上一步，选择产品分类</el-button>
          <el-button
            type="primary"
            @click="handleSubmit('formProduct')"
          >完成，提交产品</el-button>
        </div>
      </div>
      <div
        class="step-three"
        v-if="stepActive === 3"
      >
        <div class="success">
          <i class="el-icon-circle-check" />
          <span>保存成功！</span>
        </div>
        <div class="action">
          <el-button
            type="primary"
            @click="handleConfirm"
          >确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './configure.scss'
import { _getCouponTemplate, _createProduct } from '@/service/productConfigure'

export default {
  name: 'configure',
  data() {
    return {
      prefixCls: 'xcj-product-configure',
      stepActive: 1,
      couponTempOptions: [],
      washModeOptions: [
        {
          label: '模式一',
          value: 1
        },
        {
          label: '模式二',
          value: 2
        },
        {
          label: '模式三',
          value: 3
        },
        {
          label: '模式四',
          value: 4
        }
      ],
      fromProduct: this.initProductTemp(),
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
        pCode: [{ required: true, message: '请输入产品编号', trigger: 'change' }],
        pContent: [{ required: true, message: '请输入简介', trigger: 'change' }],
        pCouponId: [{ required: true, message: '请选择优惠券模板', trigger: 'change' }],
        pImg: [{ required: true, message: '请选择风格', trigger: 'change' }],
        pName: [{ required: true, message: '请输入产品名称', trigger: 'change' }],
        pNum: [{ required: true, message: '请输入次数', trigger: 'change' }],
        pRice: [{ required: true, message: '售价不能为空', trigger: 'change' }],
        pSendNum: [{ required: true, message: '请输入赠送次数', trigger: 'change' }],
        pValidateTime: [{ required: true, message: '请选择有效期', trigger: 'change' }],
        recommend: [{ required: true, message: '请输入推荐指数', trigger: 'change' }],
        style: [{ required: true, message: '请选择风格', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 选择产品类型
    handleProductType(val) {
      if (val !== this.fromProduct.pType) {
        this.fromProduct.pType = val
      }
    },

    // 下一步
    handleNext(val) {
      this.stepActive = val
      if (this.fromProduct.pType === 2) {
        _getCouponTemplate().then(response => {
          const { resultObj } = response
          this.couponTempOptions = resultObj.map(item => {
            return {
              label: item.couponName,
              value: item.id
            }
          })
        })
      }
    },

    // 上一步
    handlePrevious(val) {
      this.stepActive = val
    },

    // 提交
    handleSubmit(refName) {
      this.$refs[refName].validate(valid => {
        if (valid) {
          _createProduct(this.fromProduct).then(response => {
            this.stepActive = 3
            this.fromProduct = this.initProductTemp()
          })
        } else {
          return false
        }
      })
    },

    // 确定
    handleConfirm() {
      this.stepActive = 3
      this.fromProduct = this.initProductTemp()
    },

    // 步骤标题
    stepTitle() {
      const titleMap = {
        1: '选择产品分类',
        2: '填写基本信息'
      }
      return titleMap[this.stepActive]
    },

    // 初始化产品配置模板
    initProductTemp() {
      return {
        pType: '', // 产品类别 （1:套餐卡，2:次卡，3:限次卡）
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
        pCode: '', // 产品编码
        pContent: '', // 简介
        pCouponId: '', // 优惠券Id
        pImg: '', // 产品图片
        pName: '', // 产品名称
        pNum: '', // 次数
        pRice: '', // 售价
        pSendNum: '', // 赠送数量
        pValidateTime: '', // 有效期
        recommend: '', // 推荐指数 0-100
        style: '' // 风格
      }
    }
  }
}
</script>

