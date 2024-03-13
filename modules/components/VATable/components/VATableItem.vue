<template>
  <template v-if="column.tagType in components">
    <component
      :is="components[column.tagType]"
      :value="value"
      :options="column.options"
      :record="record"
    >
    </component>
  </template>
  <span v-else>{{ value }}</span>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType } from 'vue';
import { VATableColumn, VATableRecord } from '../extends/typing';
import { formatRecordValue } from '../extends/hooks';

import TableRouter from './TableRouter';
import TableTag from './TableTag';
import TableA from './TableA';
import TableCopy from './TableCopy';

const components = {
  router: TableRouter,
  tag: TableTag,
  a: TableA,
  copy: TableCopy,
};
const props = defineProps({
  column: {
    type: Object as PropType<VATableColumn>,
    required: true,
  },
  record: {
    type: Object as PropType<VATableRecord>,
    required: true,
  },
});

const value = computed(() => {
  return formatRecordValue(props.record, props.column as VATableColumn);
});
</script>
<style scoped></style>
