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
    handleClick() {
      global.alert('Well done.')
    },
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

<style lang="scss" scoped>
.map-overlay {
  position: absolute;
  min-width: 200px;
  .point-tip {
    position: relative;
    background: #fff;
    box-shadow: 3px 3px 8px #888;
    margin-bottom: 10px;
    border-radius: 5px;
    z-index: 10;
    .text {
      padding: 10px;
    }
    .arrow {
      position: absolute;
      left: 50%;
      bottom: 0;
      margin-top: -7px;
      &:before,
      &:after {
        content: '';
        width: 0;
        height: 0;
        top: 0;
        left: 0;
        margin-left: -7px;
        position: absolute;
        border: 7px solid transparent;
        border-top: 8px solid rgba(51, 51, 51, 0.2);
      }
      &:after {
        margin-left: -7px;
        border: 7px solid transparent;
        border-top: 8px solid rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
