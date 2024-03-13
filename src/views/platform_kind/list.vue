<template>
  <VARest :uris="uris"
          :search-options="searches"
          :table-columns="tableColumns"
          :breadcrumb-options="breadcrumbList"
          :form-options='formColumns'>
  </VARest>
</template>
<script lang='ts' setup>
import { APIUri } from "@/api";
import {VABreadcrumbItem} from "modules/components/VABreadcrumb/typings";
import {VASearchItem} from "modules/components/VASearch/typings";
import {VATableColumn} from "modules/components/VATable/extends/typing";
import {VAFormItem} from "modules/components/VAForm/extends/typing";

const uris = APIUri.platformKind.restful

const breadcrumbList: Array<VABreadcrumbItem> = [
  {label: "平台分类管理"},
]

const searches: Array<VASearchItem> = [
  {field: 'name__contains', placeholder: '请输入名称'}
]

const tableColumns: Array<VATableColumn> = [
  { title: "类型名", dataIndex: "name", slot: 'edit' },
  { title: "类型描述", dataIndex: "description" },
  { title: "操作", dataIndex: "action", slot: "action" }
]
const formColumns: Array<VAFormItem> = [
  { label: '类型名', key: 'name', required: true },
  { label: '类型描述', key: 'description' },
]
</script>
