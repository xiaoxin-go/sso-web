<template>
  <a-radio-group
    button-style="solid"
    name="radioGroup"
    :value="value"
    :disabled="disabled"
    :size="size"
    :option-type="options.type"
    :options="source"
    @change="change"
  >
  </a-radio-group>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, PropType } from 'vue';
import { RadioItem, VARadioOptions } from './typings';
import { useRadioGroupHandler } from './hooks';
const emits = defineEmits(['update:value']);
const props = defineProps({
  value: {
    type: [String, Number, Boolean],
    required: true,
    default: () => {
      return '';
    },
  },
  // 接收静态数据或者远程配置
  options: {
    type: Object as PropType<
      VARadioOptions | string[] | number[] | Array<RadioItem>
    >,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
  },
});
const { data } = useRadioGroupHandler(props.options as VARadioOptions);

const source = computed(() => {
  return props.options instanceof Array ? props.options : data.value;
});

const change = (event: any) => {
  console.log('------------------>', event.target.value);
  emits('update:value', event.target.value);
};
</script>

<style scoped></style>
