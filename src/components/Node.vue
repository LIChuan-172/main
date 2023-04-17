<script setup lang="ts">
import { defineAsyncComponent, watch, ref, shallowRef } from "vue"

const counter1Url = "http://localhost:5500/Counter.js"
const counter2Url = "http://localhost:5502/Counter2.js"

defineProps({
  name: {
    type: String,
    required: true
  }
})

const url = ref(counter2Url)
const NodeBody = shallowRef(
  defineAsyncComponent(
    () =>
      new Promise<any>((res, rej) => {
        import(counter2Url /* @vite-ignore */)
          .then(({ default: Counter }) => res(Counter))
          .catch((err) => rej(err))
      })
  )
)

setInterval(() => {
  url.value = url.value === counter1Url ? counter2Url : counter1Url
}, 2000)

watch(url, () => {
  NodeBody.value = defineAsyncComponent(
    () =>
      new Promise<any>((res, rej) => {
        import(url.value /* @vite-ignore */)
          .then(({ default: Counter }) => res(Counter))
          .catch((err) => rej(err))
      })
  )
})
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
    <div>
      <NodeBody />
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
