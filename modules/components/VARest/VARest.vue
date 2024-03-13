<template>
  <div class="va-rest">
    <div>
      <VABreadcrumb
        v-if="props.breadcrumbOptions.length > 0"
        :options="props.breadcrumbOptions"
      ></VABreadcrumb>
    </div>
    <div class="va-rest-main">
      <!-- title  -->
      <div class="va-rest-header">
        <VASearch
          v-if="props.searchOptions"
          size="small"
          ref="searchRef"
          :options="props.searchOptions"
          @on-search="onSearch"
          @on-change="onChange"
        >
          <template
            v-for="item in props.searchOptions"
            :key="item.slot"
            #[item.slot]="{ data }"
          >
            <slot :name="item.slot" :data="data"></slot>
          </template>
        </VASearch>
        <span>
          <slot name="restHeader"></slot>
        </span>
      </div>
      <!--  table  -->
      <div class="va-rest-body">
        <a-button
          class="va-rest-add"
          @click="add"
          v-if="uris.create"
          type="primary"
          size="small"
        >
          <template #icon>
            <plus-outlined />
          </template>
          添加
        </a-button>
        <div class="va-rest-table">
          <v-a-table
            v-if="uris.list"
            ref="table"
            :selection="props.selection"
            :uri="uris.list"
            :columns="props.tableColumns"
            :expandedRowRender="props.expandedRowRender"
            :manual="props.manual"
            :expand="props.tableExpand"
            :format="props.tableFormat"
            :bordered="props.tableBordered"
            v-model:defaultParams="searchParams"
          >
            <template
              v-for="column in props.tableColumns"
              :key="column.dataIndex"
              #[column.slot]="{ record, dataSource }"
            >
              <!--     注入修改操作     -->
              <rest-edit
                v-if="column.slot === 'edit' && uris.update"
                @click="edit(record, column.dataIndex)"
                :value="formatRecordValue(record, column)"
              >
              </rest-edit>
              <!--    注册删除操作    -->
              <span v-else-if="column.slot === 'action'">
                <!--    如果操作里有其它按钮，也注入插槽      -->
                <template v-for="item in column.options?.slots" :key="item">
                  <slot
                    :name="item"
                    :record="record"
                    :dataSource="dataSource"
                  ></slot>
                </template>
                <VAPopconfirm
                  v-if="uris.delete"
                  title="确定删除当前？"
                  label="删除"
                  labelColor="#DC143C"
                  placeholder="确定删除吗？"
                  @on-ok="remove(record)"
                >
                </VAPopconfirm>
              </span>
              <!--   注入插槽     -->
              <slot
                v-else-if="column.slot"
                :name="column.slot"
                :record="record"
                :dataSource="dataSource"
              >
              </slot>
            </template>
            <template #expandedRowRender="{ record }">
              <slot name="expandedRowRender" :record="record"> </slot>
            </template>
          </v-a-table>
        </div>
      </div>
    </div>
    <!--  嵌入添加和修改表单  -->
    <VAFormDrawer
      v-if="props.formOptions?.length > 0 && (uris.create || uris.update)"
      v-model:visible="visible"
      :title="title"
      :data="data"
      :options="props.formOptions"
      @close="cancel"
      @submit="formSubmit"
      :formWidth="props.formWidth"
    >
      <template #extra>
        <slot name="extra"></slot>
      </template>
      <template #customFooter>
        <slot name="customFooter" />
      </template>
      <template v-for="v in props.formOptions" #[v.slot]="{ item, data }">
        <slot v-if="v.slot" :name="v.slot" :item="item" :data="data"></slot>
      </template>
    </VAFormDrawer>
  </div>
</template>
<script lang="ts" setup>
import VASearch from '../VASearch/VASearch.vue';
import VATable from '../VATable/VATable.vue';
import VAFormDrawer from '../VAFormDrawer/VAFormDrawer.vue';
import VAPopconfirm from '../VAPopconfirm/VAPopconfirm.vue';
import RestEdit from './components/RestEdit.vue';
import propsOptions from './extends/props';
import {
  defineEmits,
  defineProps,
  defineExpose,
  ref,
  computed,
  Ref,
} from 'vue';
import { useFormDrawer, useTableRef } from './extends/hooks';
import { VAFormItem } from '../VAForm/extends/typing';
import { formatRecordValue } from '../VATable/extends/hooks';
import { PlusOutlined } from '@ant-design/icons-vue';
import VABreadcrumb from '../VABreadcrumb/VABreadcrumb.vue';
import { KeyValueType } from '../../typing';
import { useRoute } from 'vue-router';
const emit = defineEmits([
  'beforeCreate',
  'afterCreate',
  'beforeUpdate',
  'afterUpdate',
  'beforeDelete',
  'afterDelete',
  'beforeEdit',
  'beforeAdd',
  'on-tab',
  'beforeSearch',
]);

const route = useRoute();

const props = defineProps(propsOptions);

const uris: Ref = computed(() => {
  return props.uris || {};
});
const searchRef = ref();

const searchParams = ref(props.searchDefaultParams || {});

const beforeSearch = (par: any) => {
  emit('beforeSearch', par, (val: any) => (par = val));
  return par;
};
const onSearch = (value: any = {}) => {
  // 如果默认搜索和搜索都有query类型，则把query合并，避免冲突
  if ('query' in value && 'query' in props.searchDefaultParams) {
    value['query'] = makeQuery(value.query, props.searchDefaultParams['query']);
  }
  reload(beforeSearch({ ...searchParams.value, ...value }));
};

// 合并query参数，新的查询query需要替代旧的query
const makeQuery = (searchQuery: any, defaultQuery: any): any =>{
  const result = []
  const m = {} as any
  searchQuery.forEach(item=>{
    result.push(item)
    m[item.key] = item.val
  })
  defaultQuery.forEach(item=>{
    if (!m[item.key]){
      result.push(item)
    }
  })
  return result
}
const onChange = (value: string) => {
  emit('on-tab', value);
};
const { table, reload, remove } = useTableRef(
  uris,
  props.searchDefaultParams,
  emit
);

const { visible, title, data, edit, add, cancel, submit } = useFormDrawer(
  props.formOptions as Array<VAFormItem>,
  props.formDefaultParams as KeyValueType,
  emit
);

const formSubmit = (params: any) => {
  const page = Number(route.query.page || 1);
  const size = Number(route.query.size || 20);
  // console.log('page------>', searchRef.value.parseValue());
  try {
    const searchParams = {
      page: page,
      size: size,
      ...searchRef.value.parseValue(),
    };
  } catch {
    const searchParams = {
      page: page,
      size: size,
    };
  }
  // console.log(searchParams);
  submit(params, emit, uris, onSearch, searchParams);
};

const selectedRowKeys = computed(() => {
  return table.value.selectedRowKeys;
});

defineExpose({ onSearch, selectedRowKeys, data, visible, reload, searchRef });
</script>

<style scoped>
.va-rest {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.va-rest-main {
  background: white;
  padding: 20px 20px 0 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  margin-bottom: 15px;
}

.va-rest-header {
  margin-bottom: 10px;
  display: inline-flex;
}

.va-rest-body {
  flex: 1;
  position: relative;
  min-height: 0;
}

.va-rest-add {
  position: absolute;
  right: 5px;
  z-index: 999;
  top: -34px;
}

.va-rest-table {
  height: 100%;
}
</style>
