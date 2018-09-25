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
  props: ['text', 'position', 'active'],
  methods: {
    draw({ el, BMap, map }) {
      // 使用setTimeout，防止放大缩写时获取不到覆盖物元素宽高
      setTimeout(() => {
        const { lng, lat } = this.position
        const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
        el.style.width = el.offsetWidth
        el.style.height = el.offsetHeight
        el.style.left = pixel.x - el.scrollWidth / 2 + 'px'
        el.style.top = pixel.y - el.scrollHeight - 20 + 'px'
      }, 100)
    }
  }
}
</script>
