<template>
  <a-drawer
    :visible="visible"
    :maskClosable="false"
    @close="onCancel"
    width="800px"
    class="custom-class"
    :title="`${transfer.title}`"
    placement="right"
  >
    <!-- :titles="['未被分享的用户', '已被分享的用户']" -->
    <a-transfer
      v-model:target-keys="data.targetList"
      :data-source="data.dataSource"
      :render="(item) => item.title"
      :show-search="
        props.transfer.showSearch ? props.transfer.showSearch : true
      "
      :pagination="
        props.transfer.pagination
          ? { pageSize: props.transfer.pageSize }
          : false
      "
      style="height: 100%"
      @search="search"
    />

    <!-- <template #render="item"
              v-if="transfer.render">
      <slot name='render'
            :record='item'></slot>
    </template> -->

    <template #footer>
      <slot name="action">
        <a-button
          style="margin-right: 8px"
          size="small"
          @click.prevent="onCancel"
          >Cancel</a-button
        >
        <a-button type="primary" size="small" @click="submit">提交</a-button>
      </slot>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import {
  reactive,
  onMounted,
  defineProps,
  defineEmits,
  watch,
  PropType,
} from 'vue';
import { post, get } from '@/api';
import { message, LayoutHeader } from 'ant-design-vue';
import { VATransfer } from './typings';

const emit = defineEmits(['update:visible', 'on-success', 'on-search']);
const props = defineProps({
  transfer: {
    type: Object as PropType<VATransfer>,
    required: true,
  },
  visible: {
    type: Boolean,
  },
});
console.log(props, 'propsprops--');

const data = reactive({
  dataSource: [],
  targetList: [],
  ID: props.transfer.ID,
});
const onCancel = () => {
  emit('update:visible', false);
};
const submit = async () => {
  const res = await post(props.transfer.url.update, {
    id: props.transfer.ID,
    [props.transfer.query]: data.targetList,
  });
  if (res.data.code === 0) {
    emit('on-success');
    message.success(res.data.data);
  }
};
// 初始化执行一次
const getDataSource = async (search = '') => {
  //  左边
  let p = props.transfer.params
    ? { [props.transfer.params]: props.transfer.ID }
    : {
        all: true,
      };

  const resAll = await get(
    props.transfer.url.dataSource,
    { ...p }
    // props.transfer.size ? { size: props.transfer.size } : { all: true }
  );
  console.log(resAll, 'lll');

  if (resAll.data.code == 0) {
    data.dataSource = resAll.data.data.map(
      (element: { id: number; username: string; name_cn: string }) => {
        return {
          key: element[props.transfer.type],
          title: `${element.username}___${element.name_cn}`,
        };
      }
    );
    console.log(data.dataSource, '  data.dataSource');
  }
};
// 点击每次执行
const getTargetList = async () => {
  //  已选中的 右边
  console.log(props.transfer, 'props.transfer');

  let p = props.transfer.params
    ? { [props.transfer.params]: props.transfer.ID }
    : {
        id: props.transfer.ID,
      };
  const res = await get(props.transfer.url.targetList, {
    ...p,
  });
  console.log(res.data.data, 'res.data.data');

  if (res.data.code == 0)
    data.targetList = res.data.data.map(
      (element: any) => element[props.transfer.type]
    );
};
const search = (direction: string, value: string) => {
  // console.log(value, "searchsearch");
  if (direction == 'left') getDataSource(value);
};

watch(
  () => props.visible,
  (newValue: any) => {
    if (newValue) {
      getTargetList();
      getDataSource();
    }
  }
);
onMounted(() => {
  if (props.transfer.manual) return;
  getDataSource();
});
</script>

<style>
.ant-transfer-list {
  height: 100% !important;
  width: 45% !important;
}
</style>
