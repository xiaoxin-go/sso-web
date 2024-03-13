<template>
  <a-tooltip color="white">
    <template #title>
      <a-tag v-for="item in names" :key="item">{{ item }}</a-tag>
    </template>
    <a @click="clickUpdate">
      <edit-outlined style="margin-right: 5px"/>
      <template v-if="names && names.length === 0">
        {{ title }}
      </template>
      <template v-else>
        {{ names[0] }}
        <template v-if="names.length>1">...</template>
      </template>
    </a>
  </a-tooltip>
  <a-modal :title="props.title" v-model:open="visible" style="height: 500px" @ok="submit">
    <a-transfer
        v-model:target-keys="ids"
        :data-source="source"
        :render="(item) => item.title"
        :show-search="true"
        :pagination="{ pageSize: 10 }"
        style="height: 400px"
    />
  </a-modal>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, PropType, ref} from "vue";
import {EditOutlined} from '@ant-design/icons-vue'
import {get, put} from "@/api";
import {notify} from "@kyvg/vue3-notification";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  names: {
    type: Array as PropType<string[]>,
    default: () => {
      return []
    }
  },
  getUri: {
    type: String,
    required: true
  },
  dataUri: {
    type: String,
    required: true
  },
  updateUri: {
    type: String,
    required: true,
  },
  tenementId: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    default: ()=>{
      return 'name'
    }
  },
  updateKey: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['reload'])
const visible = ref(false)
const ids = ref([])
const source = ref([])

const clickUpdate = async () => {
  let res = await get(props.getUri, {id: props.tenementId})
  if (res.data.code === 0) {
    ids.value = res.data.data.map((item: any)=>item.id)
    visible.value = true
  }
  res = await get(props.dataUri, {size: 1000})
  if(res.data.code === 0){
    source.value = res.data.data.map((item: any)=>{
      return {title: item[props.label], key: item.id}
    })
    notify({type: 'success', text: '关联成功'})
  }
}

const submit = async() =>{
  let params = {tenement_id: props.tenementId, [props.updateKey]: ids.value}
  let res = await put(props.updateUri, params)
  if(res.data.code === 0){
    visible.value = false
    emit('reload')
  }
}
</script>

<style scoped>

</style>
