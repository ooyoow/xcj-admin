<template>
  <div class='chart-container'>
    <line-chart height='100%' width='100%'></line-chart>
  </div>
</template>

<script>
import lineChart from '@/components/charts/line'

export default {
  name: 'lineChart',
  components: { lineChart }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  padding: 20px;
  width: 100%;
  height: 85vh;
}
</style>
