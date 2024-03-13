<template>
  <div class="main">
    <VABreadcrumb :options="breadcrumbList"></VABreadcrumb>
    <div class="main-body">
      <div class="platform-self-search">
        <a-input v-model:value="searchValue" @change="filterPlat" placeholder="输入平台名" style="width: 150px; margin-right: 10px" size="small"></a-input>
        <a-button type="primary" size="small" @click="search">搜索</a-button>
      </div>
      <a-collapse v-model:activeKey="activeKey" class="platform-self-content" :bordered="false">
        <a-collapse-panel v-for="item in selfPlatforms" :key="item.kind" :header="item.kind" style="background-color: #fff;">
          <div style="display: flex">
            <div v-for="platform in item.platforms" :key="platform.id" style="margin-right: 20px; margin-bottom: 20px">
              <a-card style="width: 200px;" hoverable>
                <a @click="goto({plat_id: platform.id})"><AppstoreFilled style="color: #1b9efb; margin-right: 5px"/>{{platform.name}}</a>
                <span style="display: block; color: #868282; margin-top: 5px">{{platform.description}}</span>
                <a-tooltip :title="platform.url">
                  <span class="platform-url">{{platform.url}}</span>
                </a-tooltip>
              </a-card>
            </div>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import {VABreadcrumbItem} from "modules/components/VABreadcrumb/typings";
import {useOperate, useRequest} from "@/utils/hooks";
import {APIUri} from "@/api";
import {computed, onMounted, ref} from "vue";
import {AppstoreFilled} from '@ant-design/icons-vue'

interface Platform{
  id: number
  url: string
  name: string
  description: string
}
interface KindPlatform{
  kind: string
  platforms: Platform[]
}

const breadcrumbList: Array<VABreadcrumbItem> = [
  {label: "我的平台"},
]

const activeKey = ref()
const searchValue = ref("")
const selfPlatforms = ref<KindPlatform[]>([])

onMounted(()=>{
  getSelfPlatforms().then(()=>selfPlatforms.value = source.value)
})

// 激活的分类，默认把所有都添加进去
const initActiveKey = (data: any) =>{
  activeKey.value = data.map((item: any)=>item.kind)
}

const search = () =>{
  getSelfPlatforms().then(filterPlat)
}
const filterPlat = () =>{
  selfPlatforms.value = (source.value as KindPlatform[]).filter(item=>
    item.platforms.findIndex(plat=>plat.name.indexOf(searchValue.value) > -1) > -1
  ).map(item=>{
    return {...item, platforms: item.platforms.filter(plat=>plat.name.indexOf(searchValue.value) > -1)}
  })
}

const {data: source, run: getSelfPlatforms} = useRequest(APIUri.platform.self, {}, {manual: true}, initActiveKey)



const goto = useOperate(APIUri.platform.goto, {}, (data)=>{
  window.open(data.data)
})

</script>

<style scoped>
.platform-self-search{
  border-bottom: 1px solid #d9d9d9;
  padding: 10px;
}
.platform-url{
  display: block;
  color: #a2a1a1;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 6px;
  font-size: 12px;
}
.main-body{
  overflow-y: auto;
}
</style>
