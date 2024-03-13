<template>
  <a-tabs
    :activeKey="value"
    :tab-position="options.position"
    :type="type || options.type"
    :tab-bar-gutter="options.barGutter"
    :size="options.size"
    @change="onChange"
  >
    <a-tab-pane
      v-for="item in source"
      :key="item.value"
      :disabled="item.disabled"
    >
      <template #tab>
        <span>
          {{ item.label }}
        </span>
      </template>
      <slot v-if="item.slot" :name="item.slot"> </slot>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup>
import {
  defineEmits,
  defineProps,
  PropType,
  watch,
  onMounted,
  computed,
} from 'vue';
import { TabsItem, VATabsOptions } from './typings';
import { useTabsHandler } from './hooks';

const emit = defineEmits(['on-change', 'update:value']);

// 静态数据初始化第一条数据点击事件
onMounted(() => {
  if (props.options instanceof Array) {
    initChange(props.options[0].value);
  }
});

const props = defineProps({
  value: {
    type: [String, Number],
    required: true,
  },
  options: {
    type: Object as PropType<VATabsOptions | Array<TabsItem>>,
    required: true,
  },
  type: String
});
// 获取远程数据
const { data } = useTabsHandler(props.options as VATabsOptions);

const source = computed(() => {
  return props.options instanceof Array ? props.options : data.value;
});

const onChange = (value: any) => {
  emit('update:value', value);
  emit('on-change', value);
};

// 进来则渲染第一个按钮，并触发点击事件，初始化点击第一个按钮
const initChange = (value: any) => {
  onChange(value);
};
// 获取远程数据后初始化第一个值
watch(
  () => data.value,
  () => {
    initChange(data.value[0].value);
  },
  { deep: true }
);
</script>

<style scoped></style>
