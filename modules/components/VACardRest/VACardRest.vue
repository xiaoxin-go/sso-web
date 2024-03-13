<template>
  <div class="va-main">
    <div class="va-main-breadcrumb">
      <VABreadcrumb :options="props.breadcrumbOptions"></VABreadcrumb>
    </div>
    <div class="va-main-body">
      <div class="va-main-body-search">
        <VASearch :options="props.searchOptions"
                  @on-search="onSearch">
        </VASearch>
      </div>
      <div class="va-card-hr"></div>
      <div class="va-main-body-content">
        <a-button v-if="props.uris.create"
                  class="va-rest-add-btn"
                  @click="clickAdd" type="primary" size="small" style="margin-right: 10px">添加
        </a-button>
        <v-a-card v-if="props.uris.list"
                  ref="cardRef"
                  :uri="props.uris.list"
                  :options="props.cardOptions">
          <template v-if="props.cardOptions.headSlot" #va-card-head="{data}">
            <slot name="va-card-head" :data="data"></slot>
          </template>
          <template v-if="props.cardOptions.iconSlot" #va-card-icon="{data}">
            <slot name="va-card-icon" :data="data"></slot>
          </template>
          <template v-if="props.cardOptions.contentSlot" #va-card-content="{data}">
            <slot name="va-card-content" :data="data"></slot>
          </template>
          <template #va-card-action="{data}">
            <slot name="va-card-action">
              <a @click="clickUpdate(data)" v-if="props.uris?.update" title="修改" style="margin-left: 20px">
                <edit-outlined/>
              </a>
              <a-popconfirm v-if="props.uris?.delete"
                            :title="`确定删除${data.name}?`"
                            ok-text="确定"
                            cancel-text="取消"
                            @confirm="onDelete(data.id)">
                <a title="删除" style="margin-left: 5px; color: palevioletred">
                  <delete-outlined/>
                </a>
              </a-popconfirm>
            </slot>
          </template>
        </v-a-card>
      </div>
    </div>
    <VAFormDrawer
        :title="title"
        v-model:visible="visible"
        :data="data"
        :options="props.formOptions"
        @submit="submit(onSearch)"
        @close="visible = false"
    >
    </VAFormDrawer>
  </div>
</template>

<script setup lang="ts">
import {EditOutlined, DeleteOutlined} from '@ant-design/icons-vue';
import {APIUri, del} from "@/api";
import VABreadcrumb from "../VABreadcrumb/VABreadcrumb"
import VASearch from "../VASearch/VASearch"
import VAFormDrawer from "../VAFormDrawer/VAFormDrawer"
import VACard from "../VACard/VACard"
import {defineProps, ref} from "vue";
import propsOptions from './props'
import {useDrawer} from "./hooks";

const props = defineProps(propsOptions)

const cardRef = ref({})
const {visible, data, clickAdd, clickUpdate, submit, title} = useDrawer(APIUri.HorusEye.Model.restful)

const onDelete = async (id: number) => {
  const res = await del(APIUri.HorusEye.Model.restful.delete, id)
  if (res.data.code === 0) {
    message.success(res.data.msg)
    onSearch()
  }
}

const onSearch = (params: any = {}) => {
  // 如果默认搜索和搜索都有query类型，则把query合并，避免冲突
  if ('query' in params && 'query' in props.searchDefaultParams) {
    params['query'] = [...params.query, ...props.searchDefaultParams['query']]
  }
  cardRef.value.reload({...props.searchDefaultParams, ...params})
}


</script>

<style scoped>
.va-main {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.va-main-breadcrumb {
  width: 100%;
}

.va-main-body {
  background-color: #fff;
  padding: 20px;
  flex: 0.98;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
}

.va-rest-add-btn {
  position: absolute;
  right: 30px;
  top: 111px;
  z-index: 999;
}

.va-main-body-content {
  height: 100%;
  overflow-y: auto;
}

.va-card-hr {
  width: 100%;
  border: 1px solid #f5f5f5;
  margin-top: 15px;
  margin-bottom: 10px;
}

.dataset-item {
  display: inline-block;
  width: 200px;
  height: 100px;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  margin-right: 15px;
  margin-bottom: 10px;
  padding: 20px;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  background: #fff;
  border-radius: 2px;
}

.dataset-item-description {
  font-size: 12px;
  color: #6c6969;
}
</style>
