<template>
  <a-descriptions :title="title" :column="column" :size="size">
    <template #title v-if="slotTitle"> <slot name="title"> </slot></template>
    <template #extra>
      <slot name="extra"> </slot>
    </template>
    <a-descriptions-item
      v-for="item in options"
      :key="item.label"
      :label="item.label"
      :span="item.span || 1"
    >
      <template v-if="item.slot && item.slot !== ''">
        <slot :name="item.slot"></slot>
      </template>
      <a v-else-if="item.tagType === 'a'" :style="item.style">{{
        data[item.key]
      }}</a>
      <a-tag style="margin-top: 2px"
        v-else-if="item.tagType === 'tag'"
        :color="item.colors ? item.colors[data[item.key]] : 'default'"
      >
        {{
          item.values
            ? item.values[formatValue(data, item.key)]
            : formatValue(data, item.key)
        }}
      </a-tag>
      <span v-else :style="item.style">
        {{ formatValue(data, item.key) }}
      </span>
    </a-descriptions-item>
  </a-descriptions>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
import { Dict } from '@/interface/common';
import { VADescriptionsItem } from './typings';

defineProps({
  title: String,
  column: {
    type: Number,
    default: 3,
  },
  options: Object as PropType<Array<VADescriptionsItem>>,
  data: Object as PropType<Dict>,
  slotTitle: {
    default: false,
    type: Boolean,
  },
  size: String,
});

const formatValue = (data: any, key: string): string => {
  // 对时间进行处理，转化为本地时间
  if (key === 'updated_at' || key === 'created_at') {
    const d = data[key];
    // 数据可能是 null 或 undefined
    if (d) {
      return new Date(d.toString()).toLocaleString();
    }
    return '';
  }
  return data[key];
};
</script>
