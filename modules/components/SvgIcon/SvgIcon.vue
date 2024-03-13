<template>
  <svg v-if="svg" :height="height" viewBox="0 0 1024 1024" :width="width" class="icon" :style="{verticalAlign: verticalAlign}">
    <path v-for="(p, i) in svg.paths" :d="p" :fill="getFill(i)" :key="i"></path>
  </svg>
</template>

<script setup lang="ts">
import {computed, defineProps} from "vue";
import {icons} from "./extends"

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  height: {
    type: String,
  },
  width: {
    type: String,
  },
  verticalAlign: {
    type: String,
    default: 'middle'
  },
  color: {
    type: String,
  }
})

const svg = computed(()=>{
  return icons.find(item=>item.icon === props.icon)
})

const getFill = (i: number) =>{
  if (props.color)
    return props.color
  return svg.value.fills[i] || '#544f4f'
}

</script>

<style scoped>
</style>
