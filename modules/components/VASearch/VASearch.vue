<!--  restful 组件中的search搜索组件   -->
<template>
  <span class="va-search">
    <span class="search-item" v-for="item in options" :key="item.field">
      <slot v-if="item.slot" :item="item" :name="item.slot" :data="source">
      </slot>
      <template v-else-if="item.tagType in components">
        <component
          :is="components[item.tagType]"
          v-model:value="source[item.field]"
          :options="item.options"
          :width="item.width || '136px'"
          :size="size"
          :placeholder="item.placeholder"
          @on-change="changeItem(item)"
        ></component>
      </template>
      <a-input
        v-else
        v-model:value="source[item.field]"
        :style="`width: ${item.width || '136px'}`"
        :placeholder="item.placeholder"
        :size="size"
        @pressEnter="changeItem(item)"
      >
      </a-input>
    </span>
    <a-button
      type="primary"
      class="no-search"
      style="margin-left: 5px"
      :size="size"
      @click="onSearch"
      >搜索</a-button
    >
  </span>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref, defineEmits, defineExpose } from 'vue';
import { VASearchItem } from './typings';
import VATabs from '../VATabs/VATabs';
import VASelect from '../VASelect/VASelect';
import VATabsCascade from '../VATabsCascade/VATabsCascade';
import VASelectCascade from '../VASelectCascade/VASelectCascade';

const components = {
  tabs: VATabs,
  select: VASelect,
  'select-cascade': VASelectCascade,
  'tabs-cascade': VATabsCascade,
};

const emit = defineEmits(['on-search', 'on-change']);
const props = defineProps({
  options: {
    type: Array as PropType<Array<VASearchItem>>,
    required: true,
  },
  size: {
    type: String,
    default: 'small',
  },
});

const source = ref({});

const changeItem = (item: VASearchItem) => {
  if (item.isSearch !== false) {
    onSearch();
  }
};

const onSearch = () => {
  emit('on-search', parseValue());
};

// 根据search items解析参数，有query，有正常查询的
const parseValue = () => {
  if (!props.options) return {};

  const result = { query: [] }; // 初始化查询参数
  const _push = (item: VASearchItem) => {
    if (item.paramsType === 'query')
      // 如果查询类型是query，则需要添加到query查询内
      result.query.push({
        key: item.field,
        val: source.value[item.field].toString(),
        type: item.queryType || 'eq',
      });
    else result[item.field] = source.value[item.field]; // 否则直接赋值即可
  };
  // 循环查询项，查询时，把查询项根据查询类型插入到查询参数中
  props.options.map((item: VASearchItem) => {
    if (!(item.field in source.value) || source.value[item.field] === undefined)
      // 此处判断，是为搜索框值为空，则从params中去除
      return;
    _push(item);
    // 级联的也添加
    // if(item.options?.child){
    //   _push(item.options.child)
    // }
  });
  return result;
};
defineExpose({ parseValue });
</script>

<style scoped>
.search-item {
  margin-right: 5px;
}
</style>
