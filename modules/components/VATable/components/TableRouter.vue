<!--table表格下路由跳转，点击跳转到详情页-->
<template>
      <span>
        <a @click.prevent="on">
          {{ value }}
        </a>
      </span>
</template>

<script setup lang="ts">
import {defineProps, PropType} from "vue";
import {TableRouterOptions, VATableRecord} from "../extends/typing";
import {useRouter} from "vue-router";

const router = useRouter()

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  options: {
    type: Object as PropType<TableRouterOptions>,
    required: true
  },
  record: {
    type: Object as PropType<VATableRecord>,
    default: () => {
      return {}
    }
  }
})

// 路由跳转点击事件
const on = () =>{
  if (!props.options.name) {
    throw new Error("前端数据未定义跳转的路由名称")
  }
  // 路由跳转携带参数，默认获取传入的参数
  let query = props.options.query || {}
  if(props.options.key){
    query[props.options.key] = props.record[props.options.dataIndex]
  }
  router.push({name: props.options.name, query: query});
}

</script>

<style scoped>

</style>
