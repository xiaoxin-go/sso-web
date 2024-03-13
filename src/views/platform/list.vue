<template>
  <VARest :uris="uris"
          :search-options="searches"
          :table-columns="tableColumns"
          :breadcrumb-options="breadcrumbList"
          :form-options='formColumns'>
  </VARest>
</template>
<script lang='ts' setup>
import {APIUri} from "@/api";
import {VABreadcrumbItem} from "modules/components/VABreadcrumb/typings";
import {VASearchItem} from "modules/components/VASearch/typings";
import {VATableColumn} from "modules/components/VATable/extends/typing";
import {VAFormItem} from "modules/components/VAForm/extends/typing";
import {Auth} from "@/auth/common";

const uris = new Auth().useRestfulUris(APIUri.platform.restful)

const breadcrumbList: Array<VABreadcrumbItem> = [
  {label: "平台管理"},
]

const searches: Array<VASearchItem> = [
  {field: 'name__contains', placeholder: '请输入名称'}
]

const tableColumns: Array<VATableColumn> = [
  {title: "平台名", dataIndex: "name", slot: 'edit'},
  {title: "平台中文名", dataIndex: "name_cn"},
  {
    title: "平台类型", dataIndex: "type", tagType: 'tag', options: {
      labels: {1: '内部平台', 2: '外部平台'},
      colors: {1: 'blue', 2: 'green'}
    }
  },
  {
    title: "平台类别", dataIndex: "kind_name", tagType: 'tag'
  },
  {title: "描述", dataIndex: "description"},
  {title: "平台地址", dataIndex: "url"},
  {title: "平台首页", dataIndex: "index_url"},
  {
    title: "是否启用", dataIndex: "enabled", tagType: "tag", width: 90,
    options: {
      colors: {1: 'green', 0: 'red'},
      labels: {1: '是', 0: '否'}
    }
  },
  {title: "操作", dataIndex: "action", slot: "action"}
]
const formColumns: Array<VAFormItem> = [
  {label: '平台名', key: 'name', required: true},
  {label: '平台中文名', key: 'name_cn', required: true},
  {label: '平台地址', key: 'url', required: true},
  {
    label: '平台类型', key: 'type', tagType: 'radio-group', options: [
      {label: '内部平台', value: 1},
      {label: '外部平台', value: 2},
    ], required: true, default: 1
  },
  {
    label: '平台分类', key: 'kind_id', tagType: 'select', required: true,
    options: {
      uri: APIUri.platformKind.restful.list, defaultParams: {size: 100}, label: 'name', value: 'id'
    }
  },
  {label: '登录函数', key: 'login_func'},
  {label: '平台首页', key: 'index_url', required: true},
  {
    label: '是否启用', key: 'enabled', tagType: 'radio-group', required: true, default: 1,
    options: [{label: "是", value: 1}, {label: "否", value: 0}]
  },
  {label: '描述', key: 'description', required: true, tagType: 'textarea'},
]
</script>
