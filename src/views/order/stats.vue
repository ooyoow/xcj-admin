<template>
  <div>
    <div class="title" v-text="title"></div>
    <div class="bar">
      <el-radio-group v-model="type" @change="onRadioChange">
        <el-radio-button label="今日"></el-radio-button>
        <el-radio-button label="本周"></el-radio-button>
        <el-radio-button label="本月"></el-radio-button>
      </el-radio-group>
      <el-date-picker v-model="date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="onDateChange"></el-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: '今日',
      date: []
    }
  },
  props: {
    title: { type: String, default: '' },
    onRadioChange: { type: Function },
    onDateChange: { type: Function }
  }
}
</script>

