<template>
  <a-input-number
    :value="value"
    :disabled="disabled"
    :placeholder="placeholder"
    @change="change"
    style="width: 100%"
    :addon-after="addonAfter"
    :addon-before="addonBefore"
    :min="options.min"
    :max="options.max"
  />
</template>

<script setup lang="ts">
import {defineEmits, defineProps, PropType} from 'vue';
import {InputNumberOptions} from "./typings";

const emit = defineEmits(['update:value']);

defineProps({
  value: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
  },
  placeholder: {
    type: String,
  },
  addonAfter: {
    type: String,
    default: '',
  },
  addonBefore: {
    type: String,
    default: '',
  },
  options: {
    type: Object as PropType<InputNumberOptions>,
    default: ()=>{
      return {}
    }
  }
});

const change = (value: number) => {
  emit('update:value', value);
};
</script>

<style scoped></style>
