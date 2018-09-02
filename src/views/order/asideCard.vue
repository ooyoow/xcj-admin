<template>
  <div class="card">
    <div class="card-text" v-text="title"></div>
    <div class="card-count" v-text="count"></div>
    <div>
      <span>
        <icon :name="trend" />
        <span :class="trendRatio.includes('-') ? 'card-ratio-down' : 'card-ratio-up'" v-text="trendRatio||'0%'"></span>
      </span>
      <span class="card-text" v-text="compareName"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String },
    count: { type: Number },
    trend: { type: String },
    trendRatio: { type: String },
    compareName: { type: String }
  }
}
</script>

