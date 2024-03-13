<template>
  <a-time-picker :value="value" :value-format="options?.valueFormat" :format="options?.format" @change="onChange"/>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const emit = defineEmits(['update:value'])
const props = defineProps({
  value: String,
  options: Object,
})

const onChange = (time: string) =>{
  emit("update:value", time)
}

</script>

<style scoped>

</style>
