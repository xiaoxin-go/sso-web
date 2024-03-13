<template>
  <a-cascader :value="value"
              :disabled="disabled"
              :width="width"
              :size="size"
              :fieldNames="options.fieldNames"
              :options="source"
              :placeholder="placeholder || '请选择' + options.label"
              expand-trigger="hover"
              change-on-select
              @change="change"
  />
</template>

<script setup lang="ts">

import {defineProps, PropType, defineEmits, defineExpose, computed} from "vue";
import {CascaderItem, VACascaderOptions} from "typings";
import {useCascaderHandler} from "./hooks";
const emit = defineEmits(["update:value","on-change"])
const props = defineProps({
  // data属性里的key
  value: {
    type: Object as PropType<string | number>,
    required: true
  },
  options: {
    type: Object as PropType<VACascaderOptions | Array<CascaderItem>>,
    required: true
  },
  size: {
    type: String,
  },
  placeholder: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '100%'
  }
})

const {data, run: load} = useCascaderHandler(props.options as VACascaderOptions)

const source = computed(()=>{
  return props.options instanceof Array?props.options:data.value
})

const change = (value, selectedOptions) => {
  emit("update:value", value)
  emit("on-change", value, selectedOptions)
}

defineExpose({load})

</script>

<style scoped>

</style>
