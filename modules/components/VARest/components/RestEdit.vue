<template>
  <a title="编辑" @click="clickEdit">
    <edit-outlined/>
    {{ value }}
  </a>
</template>

<script setup lang="ts">
import {EditOutlined} from "@ant-design/icons-vue"
import {defineProps, defineEmits} from "vue";

const emit = defineEmits(['click'])

defineProps({
  value: {
    type: String,
    required: true
  },
})

const clickEdit = () =>{
  emit("click")
}

</script>

<style scoped>

</style>
