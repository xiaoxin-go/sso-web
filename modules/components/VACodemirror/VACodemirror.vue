<template>
  <Codemirror
    :value="parseCode()"
    :options="cmOptions"
    border
    ref="cmRef"
    :height="options?.height || '100%'"
    width="100%"
    @change="change"
  >
  </Codemirror>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, onMounted, PropType, ref } from 'vue';
import { EditorConfiguration } from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import Codemirror from 'codemirror-editor-vue3';
import { CodemirrorOptions } from './typings';
import 'codemirror/addon/display/autorefresh';

const emit = defineEmits(['update:value']);

const props = defineProps({
  value: String,
  options: {
    type: Object as PropType<CodemirrorOptions>,
  },
});

const parseCode = () => {
  try {
    return JSON.stringify(JSON.parse(props.value), null, '  ');
  } catch (e) {
    return props.value;
  }
};

onMounted(() => {
  // 延时加载，解决不显示BUG
  // setTimeout(() => {
  //   cmRef.value.refresh();
  // }, 1);
});

const cmRef = ref();
const cmOptions: EditorConfiguration = {
  mode: props.options?.mode || 'application/json',
  theme: props.options?.theme || 'default',
  lineWrapping: true,
  autocorrect: true,
  autoRefresh: true,
  smartIndent: true,
  autofocus: true,
  autocapitalize: true,
};

const change = (v: any) => {
  emit('update:value', v);
};
</script>

<style scoped></style>
