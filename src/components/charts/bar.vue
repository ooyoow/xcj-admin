<template>
  <div ref="bar" :option="option" :style="{height: height, width: width}"></div>
</template>

<script>
// import echarts from "echarts";
import echarts from "@/utils/echarts"
export default {
  // mixins: [resize],
  name: "bar",
  props: {
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "200px"
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
    };
  },
  mounted() {
    this.initChart();
  },
  beforeUpdate() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.bar);
      this.chart.setOption(this.option);
    }
  }
};
</script>
