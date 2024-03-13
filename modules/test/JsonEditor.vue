<template>
  <div class="main-body">
    <JsonEditor
                v-model:value="value"
              placeholder="请选择属地"
              width="120px">
    </JsonEditor>
    <div>
      {{value}}
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";


const value = ref('{"name": "lisi"}')

</script>
