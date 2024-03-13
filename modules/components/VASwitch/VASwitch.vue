<template>
  <a-switch :checked="value"
            :checkedValue="options.checked.value"
            :unCheckedValue="options.unChecked.value"
            :checkedChildren="options.checked.label"
            :disabled="disabled"
            :size="size"
            :unCheckedChildren="options.unChecked.label"
            @change="change"
  />
</template>

<script lang="ts" setup>

import {defineProps, PropType, defineEmits} from "vue";
import {VASwitchOptions} from "./typings";

const emits = defineEmits(['on-change', "update:value"])

defineProps({
  value: {
    type: Object as PropType<string| number | boolean>,
    required: true
  },
  options: {
    type: Object as PropType<VASwitchOptions>,
    required: true
  },
  disabled: Boolean,
  size:{
    type: String,
  }
})

const change = (value: string| number | boolean) => {
  emits("update:value", value)
  emits('on-change', value)
}

</script>

<style scoped>

</style>
