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

const uris = APIUri.platformUser.restful

const breadcrumbList: Array<VABreadcrumbItem> = [
  {label: "PlatformUser"},
]

const searches: Array<VASearchItem> = [
  {field: 'name__contains', placeholder: '请输入名称'}
]

const tableColumns: Array<VATableColumn> = [
  { title: "平台", dataIndex: "platform_id" },
  { title: "用户名", dataIndex: "username" },
  { title: "密码", dataIndex: "password" },
  { title: "是否是默认账号", dataIndex: "is_default" },
  { title: "操作", dataIndex: "action", slot: "action" }
]
const formColumns: Array<VAFormItem> = [
  {
    label: '平台', key: 'platform_id', tagType: 'select', required: true,
    options: {uri: APIUri.platform.restful.list, label: 'name', value: 'id', defaultParams: {size: 100}}
  },
  { label: '用户名', key: 'username', required: true },
  { label: '密码', key: 'password', required: true },
  { label: '是否是默认账号', key: 'is_default', required: true, tagType: 'radio-group',
    options: [
      {label: '是', value: 1},
      {label: '否', value: 0},
    ],
    default: 0,
  },
]
</script>
