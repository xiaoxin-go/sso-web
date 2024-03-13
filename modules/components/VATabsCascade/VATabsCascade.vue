<template>
  <VATabs v-model:value="parentValue"
          :options="options"
          @on-change="changeParent"
  ></VATabs>
  <VASelect ref="childRef"
            :options="child"
            :placeholder="child.placeholder"
            :value="value"
            :width="child.width"
            @on-change="change"
            :size="child.size"
  >
  </VASelect>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps, PropType} from "vue";
import {VATabsCascadeOptions} from "./typings";
import VASelect from "../VASelect/VASelect";
import VATabs from "../VATabs/VATabs";
import {useTabsCascadeHandler} from "./hooks";

const emit = defineEmits(['update:value', 'on-change'])

const props = defineProps({
  value: {
    type: [String, Number, Boolean]
  },
  options: {
    type: Object as PropType<VATabsCascadeOptions>,
    default: () =>{
      return {}
    }
  }
})

const {parentValue, child, childRef, changeParent} = useTabsCascadeHandler(props.options as VATabsCascadeOptions, emit)

const change = (value: any) => {
  emit("update:value", value)
  emit("on-change", value)
}

</script>

<style scoped>

</style>
