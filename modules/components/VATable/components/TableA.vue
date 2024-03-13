<!--table表格下路由跳转，点击跳转到详情页-->
<template>
  <a @click="onClick">{{value}}</a>
</template>

<script setup lang="ts">
import {defineProps, PropType} from "vue";
import {TableAOptions, VATableRecord} from "../extends/typing";

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  options: {
    type: Object as PropType<TableAOptions>,
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

const onClick = () =>{
  if (props.options.click){
    props.options.click(props.record)
  }
}

</script>

<style scoped>

</style>
