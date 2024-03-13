<template>
  <VASelect v-model:value="parentValue"
      :disabled="disabled"
            :options="options"
            :width="width || '48%'"
            :placeholder="placeholder"
            @change="changeParent"
            :size="size">
  </VASelect>
  <span style="margin: 0 5px">-</span>
  <VASelect :disabled="disabled"
            ref="childRef"
            :options="child"
            :placeholder="child.placeholder"
            :value="value"
            :width="child.width || '48%'"
            @change="change"
            :field="child.field"
            :size="size">
  </VASelect>
</template>
<script setup lang="ts">
import {defineProps, PropType, defineEmits} from "vue";
import {VASelectCascadeOptions} from "typings";
import VASelect from "../VASelect/VASelect"
import {useSelectCascadeHandler} from "./hooks";

const emit = defineEmits(["update:value", "change"])

const props = defineProps({
  // 绑定的值
  value: {
    type: Object as PropType<string | number | boolean>,
    required: true
  },
  options: {
    type: Object as PropType<VASelectCascadeOptions>,
    required: true,
    default: () => {
      return {}
    }
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
    default: "100%"
  },
  size: {
    type: String
  },
})

const {
  parentValue, child, childRef, changeParent
} = useSelectCascadeHandler(props.options as VASelectCascadeOptions, emit)

const change = (value: any) => {
  emit("update:value", value)
  emit("on-change", value)
}
</script>
<style scoped>
</style>
