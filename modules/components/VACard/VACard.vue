<template>
  <div class="va-card">
    <a-spin tip="Loading..." :spinning="loading">
      <div class="va-card-body">
        <div class="va-card-body-item" v-for="item in source" :key="item.id">
          <a-card size="small">
            <template #title>
              <slot name="va-card-head">
                <span class="va-card-icon">
                  <slot name="va-card-icon">
                    <svg-icon height="21px" width="21px" :icon="item.icon || options.icon" vertical-align="bottom"></svg-icon>
                  </slot>
                </span>
                <a @click="to(item)" :title="options.title">{{ formatLabel(item) }}</a>
              </slot>
            </template>
            <template #extra>
              <slot name="va-card-action" :data="item"></slot>
            </template>
            <slot name="va-card-content" :data="item">
              {{ item[options.content] }}
            </slot>
          </a-card>
        </div>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </a-spin>
    <a-pagination
        style="margin: 10px 0"
        v-if="pagination"
        v-model:current="page.current"
        v-model:pageSize="page.pageSize"
        show-size-changer
        :total="page.total"
        @change="handleTableChange"
        @showSizeChange="handleTableChange"
    />
  </div>
</template>

<script setup lang="ts">
import VAIcon from '../VAIcon/VAIcon.vue'
import {defineProps, defineExpose, PropType} from "vue";
import {VACardOptions} from "./typings";
import {useRouter} from "vue-router";
import {useRequestPagination} from "./hooks";

const router = useRouter()

const props = defineProps({
  uri: {
    type: String,
    required: true
  },
  options: {
    type: Object as PropType<VACardOptions>,
    required: true,
    default: () => {
      return {}
    }
  },    // 是否启用分页，默认启用
  pagination: {
    type: Boolean,
    default: true
  },
  // 调用uri时传入的默认参数，{name: 'test'}
  defaultParams: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const {
  loading, data: source, run: reload,
  pagination: page, handleTableChange
} = useRequestPagination(props.uri, props.defaultParams)


const to = (item: any) => {
  const options = props.options?.router
  if (options?.name) {
    const query = options.defaultParams || {}
    if (options.field && options.valueField) {
      query[options.field] = item[options.valueField]
    }
    router.push({name: options.name, query: {...query}})
    return
  }
}

const formatLabel = (item: any) => {
  if (props.options?.labelFormat)
    return props.options.labelFormat(item)
  return item[props.options.label]
}

defineExpose({reload})

</script>

<style scoped>
.va-card {
  display: flex;
  margin-top: 15px;
  padding: 0 15px;
  flex: 1;
  flex-direction: column;
}

.va-card-body {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}

.va-card-icon {
  margin-right: 10px;
}
.va-card-body-item{
  padding: 0 10px 10px 10px;
  margin-bottom: 15px;
  width: 350px;
}
</style>
