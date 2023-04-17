import { ref } from "vue"

export default () => {
  const nodes = ref([
    {
      name: "node1"
    },
    { name: "node2" }
  ])

  return nodes
}
