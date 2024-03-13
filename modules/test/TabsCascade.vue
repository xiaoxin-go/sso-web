<template>
  <div class="main-body">
    <VATabsCascade v-model:value="value" :options="tabsCascadeOptions"></VATabsCascade>
  </div>
</template>

<script setup lang="ts">
import {APIUri} from "../../src/api";
import {VATabsCascade} from "../index"
import {ref} from "vue";
import {VATabsCascadeOptions} from "../components/VATabsCascade/typings";

const tabsCascadeOptions: VATabsCascadeOptions = {
  uri: APIUri.Region.restful.list, label: 'name', value: 'id',
  child: {
    params: {
      field: "region_id",
      type: "query"
    },
    placeholder: "请选择设备",
    uri: APIUri.Device.restful.list,
    label: 'name', value: 'id',
    size: 'small',
    width: "120px"
  },
}
const value = ref("")
</script>
