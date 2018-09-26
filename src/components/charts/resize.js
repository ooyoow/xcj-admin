import { debounce } from '@/utils/general'

export default {
  mounted() {
    this.resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.resizeHanlder)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHanlder)
  }
}
