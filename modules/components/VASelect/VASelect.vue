<template>
  <a-select
    :disabled="disabled"
    allow-clear
    show-search
    :filter-option="filterOption"
    :value="formatValue(value)"
    :size="size"
    :style="`width: ${width}`"
    :placeholder="placeholder || '请选择'"
    :mode="mode || options.mode"
    :options="source"
    @change="change"
  >
  </a-select>
</template>

<script setup lang="ts">
import {
  defineProps,
  PropType,
  defineEmits,
  defineExpose,
  computed,
} from 'vue';
import { LabelValue, VASelectOptions } from 'typings';
import { useSelectHandler } from './hooks';

const emit = defineEmits(['update:value', 'on-change']);
const props = defineProps({
  value: {
    type: [String, Number, Boolean, Array],
    required: true,
  },
  /*  接收静态和动态数据
   * 例：静态数据，和antd一样
   * [
   *   {label: '是', value: 1},
   *   {label: '否', value: 0}
   * ]
   * 动态数据，调用远程接口获取数据信息，获取网络区域信息
   * {
   *   uri: '/api/region',   调用的接口
   *   label: 'name',        需要展示的信息
   *   value: 'id'           最后绑定的值
   * }
   * */
  options: {
    type: [Array, Object] as PropType<VASelectOptions | Array<LabelValue>>,
    required: true,
  },
  size: {
    type: String,
  },
  mode: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '100%',
  },
});

const { data, run: load } = useSelectHandler(props.options as VASelectOptions);

// 如果是多选模式，并且值是字符串，则需要转化为list
const formatValue = (value: any) => {
  if (props.options.mode === 'multiple' && !(value instanceof Array)) {
    if (!value || value === '') {
      return [];
    }
    try {
      return JSON.parse(value);
    } catch {
      return value.split(',').map((item) => Number(item) || item);
    }
  }
  return value;
};

// 如果直接是数据，则取数据值，否则取options里面的远程数据或者data
const source = computed(() => {
  return props.options instanceof Array ? props.options : data.value;
});

const change = (value: any) => {
  if (
    props.options.mode === 'multiple' &&
    props.options.multipleValueType === 'string'
  ) {
    emit('update:value', value.join(','));
  } else {
    emit('update:value', value);
  }
  emit('on-change', value);
};

const filterOption = (input: string, option: LabelValue) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

defineExpose({ load });
</script>

<style scoped></style>
