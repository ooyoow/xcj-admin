<template>
  <div ref="bar" :style="{height: height, width: width}"></div>
</template>

<script>
import echarts from '@/utils/echarts'
import resize from './resize'
export default {
  mixins: [resize],
  name: 'bar',
  props: {
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    option: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      chart: null,
      chartOption: {}
    }
  },
  mounted() {
    this.initChart()
  },
  beforeUpdate() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.bar)
      this.chart.setOption(this.option)
    }
  },
  watch: {
    //观察option的变化
    option: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal)
          } else {
            this.chart.setOption(oldVal)
          }
        } else {
          this.initChart()
        }
      },
      deep: true //对象内部属性的监听
    }
  }
}
</script>
