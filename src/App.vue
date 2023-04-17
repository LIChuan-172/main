<script setup lang="ts">
import { provide } from "vue"
import Node from "./components/Node.vue"
import useNodes from "./composables/useNodes"

const nodes = useNodes()

provide("message", "hello from main")
</script>

<template>
  <Node v-for="node in nodes" :name="node.name" :key="node.name"></Node>
</template>

<style scoped></style>
