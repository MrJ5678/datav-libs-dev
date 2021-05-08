<template>
  <div class="test">
    <div>{{ message }}</div>
    <div>{{ doubleCount }}</div>
    <button @click="add">add count</button>
  </div>
</template>

<script>
import { ref, computed } from "vue"
export default {
  name: "TestComponent",
  setup() {
    const message = "hello world"
    const count = ref(1)
    const doubleCount = computed(() => count.value * 2)
    const add = () => {
      count.value++
    }

    return {
      message,
      doubleCount,
      add,
    }
  },
}
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
