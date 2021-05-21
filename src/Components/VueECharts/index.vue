<template>
  <div class="echarts"></div>
</template>

<script>
import { watch, onMounted } from "vue"
import ECharts from "echarts"

export default {
  name: "VueECharts",
  props: {
    options: Object,
    theme: [String, Object],
  },
  setup(ctx) {
    let dom, chart

    const initChart = () => {
      if (!chart) {
        dom = document.getElementsByClassName("echarts")[0]
        chart = ECharts.init(dom, ctx.theme)
      }
      chart.setOption(ctx.options)
    }

    onMounted(() => {
      initChart()
    })

    watch(
      () => ctx.options,
      () => {
        initChart()
      }
    )
  },
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
