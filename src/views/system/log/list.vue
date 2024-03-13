<template>
  <VARest v-if="uris.list"
      :uris="uris"
      :search-options="searches"
      :table-columns="tableColumns"
      :breadcrumb-options="breadcrumbList">
  </VARest>
</template>
<script lang='ts' setup>
import {APIUri} from '@/api';
import {VABreadcrumbItem} from "modules/components/VABreadcrumb/typings";
import {VASearchItem} from "modules/components/VASearch/typings";
import {VATableColumn} from "modules/components/VATable/extends/typing";

const uris = APIUri.system.log.restful

const breadcrumbList: Array<VABreadcrumbItem> = [
  {label: "系统管理"},
  {label: "日志管理"},
]

const searches: Array<VASearchItem> = [
  {field: 'content', placeholder: '输入内容', paramsType: 'query', queryType: 'contains'}
]

const tableColumns: Array<VATableColumn> = [
  {title: "操作人", dataIndex: "operator", width: 150},
  {title: "操作内容", dataIndex: "content", width: 400, ellipsis: true},
  {title: "操作时间", dataIndex: "created_at", width: 150},
]
</script>
