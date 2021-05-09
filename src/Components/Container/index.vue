<template>
  <div id="container" :ref="refName">
    <slot></slot>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted, nextTick } from "vue"
import { debounce } from "../../utils"

export default {
  name: "Container",
  props: {
    options: Object,
  },
  setup(ctx) {
    const refName = "container"
    const width = ref(0)
    const height = ref(0)
    const originalWidth = ref(0)
    const originalHeight = ref(0)
    let context, dom

    const initSize = () => {
      return new Promise(resolve => {
        nextTick(() => {
          dom = context.$refs[refName]
          console.log(dom)
          if (ctx.options && ctx.options.width && ctx.options.height) {
            // 组件外人为传入的 尺寸
            width.value = ctx.options.width
            height.value = ctx.options.height
          } else {
            // container 组件 自身的尺寸
            width.value = dom.clientWidth
            height.value = dom.clientHeight
          }
          // 屏幕尺寸
          if (!originalHeight.value || !originalWidth.value) {
            originalWidth.value = screen.width
            originalHeight.value = screen.height
          }
          console.log(
            width.value,
            height.value,
            originalWidth.value,
            originalHeight.value
          )

          resolve()
        })
      })
    }

    const updateSize = () => {
      if (width.value && height.value) {
        dom.style.width = `${width.value}px`
        dom.style.height = `${height.value}px`
      } else {
        dom.style.width = `${originalWidth.value}px`
        dom.style.height = `${originalHeight.value}px`
      }
    }

    const updateScale = () => {
      // body 的尺寸
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight
      // 大屏最终 宽高
      const realWidth = width.value || originalWidth.value
      const realHeight = height.value || originalHeight.value
      console.log(currentWidth, currentHeight)
      const widthScale = currentWidth / realWidth
      const heightScale = currentHeight / realHeight

      dom.style.transform = `scale(${widthScale}, ${heightScale})`
    }

    const onResize = async () => {
      console.log("onResize")
      await initSize()
      updateScale()
    }

    onMounted(async () => {
      context = getCurrentInstance().ctx
      await initSize()
      updateSize()
      updateScale()
      window.addEventListener("resize", debounce(500, onResize))
    })

    onUnmounted(() => {
      window.removeEventListener("resize", onResize)
    })

    return {
      refName,
    }
  },
}
</script>

<style lang="scss">
#container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
