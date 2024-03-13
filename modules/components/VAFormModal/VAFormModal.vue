<template>
  <a-modal
    :maskClosable="false"
    width="500px"
    :visible="props.visible"
    @cancel="close"
    :title="props.title"
  >
    <template #extra>
      <slot name="extra"> </slot>
    </template>
    <slot name="modal-header"> </slot>
    <VAForm :options="newItems" :data="data" ref="form">
      <template v-for="v in newItems" #[v.slot]="{ item, data }">
        <slot v-if="v.slot" :name="v.slot" :item="item" :data="data"></slot>
      </template>
    </VAForm>
    <template #footer>
      <a-space>
        <slot name="footer" :data="data">
          <a-button @click.prevent="close" size="small">取消</a-button>
          <a-button type="primary" size="small" @click="submit">提交 </a-button>
        </slot>
        <slot name="customFooter" :data="data" />
      </a-space>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, PropType, ref } from 'vue';
import VAForm from '../VAForm/VAForm.vue';
import { VAFormItem } from '../VAForm/extends/typing';
import { VATableRecord } from '../VATable/extends/typing';

// 添加和修改的抽屉
// 接收title, visible, data, formItems
// title有添加和修改，需要接收修改的title中的key

const emit = defineEmits(['close', 'submit']);
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  options: {
    type: Object as PropType<Array<VAFormItem>>,
    required: true,
  },
  data: {
    type: Object as PropType<VATableRecord>,
    required: true,
  },
});
const form = ref({});

// 初始化表单项，修改时update=false的禁用表单项
const newItems = computed(() => {
  // 点击添加时需要再解除禁用
  const items = props.options as Array<VAFormItem>;
  if (props.title.toString() === '添加')
    return items.map((item) => {
      if (item.update === false && item.disabled) {
        item.disabled = false;
      }
      return item;
    });

  // 若update=false，则禁用表单项
  return items.map((item) => {
    if (item.update === false) item.disabled = true;
    return item;
  });
});

const close = () => {
  emit('close');
};
const submit = () => {
  form.value.formRef.validate().then(() => {
    emit('submit', props.data);
  });
};
</script>

<style scoped></style>
