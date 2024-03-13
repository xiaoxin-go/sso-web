<template>
  <div class="main-body">
    <div style="margin: 30px">
      <VASelectCascade :data="source"
                       field="region_id"
                       :options="options"
                       placeholder="请选择属地"
                       width="130px"
                       size="small"
      >
      </VASelectCascade>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {VASelectCascadeOptions} from "../components/VASelectCascade/typings";
import {APIUri} from "../../src/api";

const options: VASelectCascadeOptions = {
  uri: APIUri.Region.restful.list,
  label: 'name', value: 'id',
  child: {
    params: {
      type: 'query',
      field: 'region_id'
    },
    placeholder: '选择设备',
    width: '150px',
    uri: APIUri.Device.restful.list,
    label: "name",
    value: "id",
  },
}

const source = ref({})
</script>
