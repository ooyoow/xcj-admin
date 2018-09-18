<template>
  <bm-overlay class="map-overlay" ref="customOverlay" @draw="draw" pane="markerPane">
    <div class="point-tip">
      <div class="text">
        <slot></slot>
      </div>
      <div class="arrow"></div>
    </div>
  </bm-overlay>
</template>

<script>
export default {
  props: ['text', 'position', 'visible'],
  watch: {
    position: {
      handler() {
        this.$refs.customOverlay.reload()
      },
      deep: false
    }
  },
  methods: {
    draw({ el, BMap, map }) {
      const { lng, lat } = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.width = el.scrollWidth
      el.style.height = el.scrollHeight
      el.style.left = pixel.x - el.scrollWidth / 2 + 'px'
      el.style.top = pixel.y - el.scrollHeight - 20 + 'px'
    }
  }
}
</script>
