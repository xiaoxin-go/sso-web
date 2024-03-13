<template>
  <div class="main-body">
    <VASelect :options="selectOptions"
              v-model:value="value"
              placeholder="请选择属地"
              width="120px"
              size="small">
    </VASelect>
    <div>
      {{value}}
    </div>
  </div>
</template>

<script setup lang="ts">
import {VASelect} from "../index";
import {ref} from "vue";
import {VASelectOptions} from "../components/VASelect/typings";
import {KeyValueType} from "../typing";

const value = ref(null)

const selectOptions: VASelectOptions = {
  uri: '/model/list',
  label: 'name',
  value: 'id',
  labelFormat: (item: KeyValueType): string => {    // 如果format函数存在时，优先级最高
    return `${item.name}-${item.id}`
  }
}
</script>
