<!--table表格下路由跳转，点击跳转到详情页-->
<template>
  <a-tag :color="color">
    {{ label }}
  </a-tag>
</template>

<script setup lang="ts">
import {computed, defineProps, PropType} from "vue";
import {TableTagOptions, VATableRecord} from "../extends/typing";

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  options: {
    type: Object as PropType<TableTagOptions>,
    default: () =>{
      return {}
    }
  },
  record: {
    type: Object as PropType<VATableRecord>,
    default: () => {
      return {}
    }
  }
})

// tag的label值
const label = computed(()=>{
  if(!props.options)return props.value
  return props.options.labels?props.options.labels[props.value]:props.value
})

// tag的颜色，根据值不同可以改变
const color = computed(()=>{
  if(!props.options)return ""
  if(props.options.color)return props.options.color
  return props.options.colors?props.options.colors[props.value]:""
})

</script>

<style scoped>

</style>
