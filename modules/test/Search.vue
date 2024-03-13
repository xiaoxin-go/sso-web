<template>
  <div class="main-content">
    <VASearch :options="options" @on-search="onSearch" size="small"></VASearch>
    <div>
      {{source}}
    </div>
  </div>
</template>

<script setup lang="ts">
import {APIUri} from "../../src/api";
import {ref} from "vue";
import {VASearch} from "../index"
import {VASearchItem} from "../components/VASearch/typings";
import {VASelectCascadeOptions} from "../components/VASelectCascade/typings";

const options: Array<VASearchItem> = [
  {
    field: 'region_tab_id',
    tagType: 'tabs',
    options: {uri: APIUri.Region.restful.list, label: 'name', value:'id'}
  },
  {
    field: 'role_id',
    tagType: 'select',
    placeholder: '选择角色',
    width: '120px',
    options: {uri: APIUri.Role.restful.list, label: 'name', value: 'id'}
  },
  {
    field: 'name',
    placeholder: '输入用户名',
    width: '120px'
  },
  {
    field: 'region_id',
    tagType: 'select-cascade',
    width: '150px',
    placeholder: '请选择属地',
    options: {
      uri: APIUri.Region.restful.list, label: 'name', value: 'id',
      child: {
        field: 'device_id',
        uri: APIUri.Device.restful.list, label: 'name', value: 'id',
        placeholder: '请选择设备',
        width: '120px',
        paramsType: 'query',
      }
    } as VASelectCascadeOptions,
  }
]

const onSearch = (value: any) =>{
  source.value = value
}

const source = ref({})
</script>
