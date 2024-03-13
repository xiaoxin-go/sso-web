<!--table表格下路由跳转，点击跳转到详情页-->
<template>
  <a-popconfirm :title="title"
                @confirm="switchConfirm">
    <a-switch size="small"
              :loading="loading"
              :disabled="options.disabled"
              :checked="value"
              :checkedValue="options.checkedValue"
              :unCheckedValue="options.unCheckedValue"
              :checkedChildren="options.checkedChildren"
              :unCheckedChildren="options.unCheckedChildren"/>
  </a-popconfirm>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, PropType} from "vue";
import { SwitchOptions} from "../extends/typing";

const emits = defineEmits(['switchConfirm'])

const props = defineProps({
  title: {
    type: String,
  },
  value: {
    type: Object as PropType<string | number | boolean>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object as PropType<SwitchOptions>,
    required: true
  },
})

// 路由跳转点击事件
const switchConfirm = () =>{
  const result = props.value === props.options.checkedValue?props.options.unCheckedValue:props.options.checkedValue
  emits("switchConfirm", result)
}

</script>

<style scoped>
</style>
