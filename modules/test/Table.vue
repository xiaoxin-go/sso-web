<template>
  <div class="main-body">
    <VATable :uri="uris.list" :columns="tableColumns">
      <template #edit="{record}">
        <a>{{record.name}}</a>
      </template>
      <template #action="{ record }">
        <a style="margin-right: 10px" @click.prevent="clickEdit(record.id)">编辑权限</a>
        <a @click="onDelete(record)" style="color: #DC143C">删除</a>
      </template>
    </VATable>
  </div>
</template>

<script setup lang="ts">
import {VATable} from "../index"
import {APIUri} from "../../src/api";
import {VATableColumn} from "../typing";

const uris = APIUri.Role.restful

const tableColumns: Array<VATableColumn> = [
  {title: "名称", dataIndex: "name", slot: "edit"},
  {title: "描述", dataIndex: "description"},
  {title: "更新时间", dataIndex: "updated_at"},
  {title: "操作", dataIndex: 'action', slot: 'action'},
]
const clickEdit = (id: number) =>{
  console.log(id)
}
const onDelete = (id: number) =>{
  console.log(id)
}
</script>
