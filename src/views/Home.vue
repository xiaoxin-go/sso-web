<template>
  <div id="home">
    <div class="home-body">
      <div class="home-body-nav">
        <button class="system-btn" @click="toPlatform">控制台</button>
        <div class="home-body-title flex justify-center items-center">
          <span class="plat text-shadow">SSO统一登录</span>
          <div class="line">|</div>
          <div class="text-shadow">
            <span class="time">{{ time }}</span>
            <div>
              <span class="date">{{ date }}</span>
              <span class="week">{{ week }}</span>
            </div>
          </div>
        </div>
        <div class="home-body-search">
          <div class="search-container flex justify-center items-center">
            <div class="search-logo cursor-pointer">
              <svg t="1705826129931" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   p-id="3504" width="20" height="20">
                <path
                    d="M477.568638 55.146624c-152.265644 0-275.699255 123.433611-275.699255 275.676677 0 152.276933 123.433611 275.733122 275.699255 275.733122 76.121533 0 137.849627 61.716806 137.849627 137.849627 0 76.087666-61.739384 137.804471-137.849627 137.804472-228.375887 0-413.537593-185.139128-413.537593-413.526305C64.019756 240.297041 249.181461 55.146624 477.568638 55.146624z"
                    p-id="3505"
                    fill="#e42c0d"></path>
                <path
                    d="M546.521674 0C287.417207 0 76.087666 204.240067 64.595493 460.477135c11.435728-225.779424 198.155312-405.330511 426.768268-405.330511 132.058385 0 250.062001 59.91057 328.452617 154.015434l67.846717-67.835427C800.342903 54.006438 679.708956 0 546.521674 0z"
                    p-id="3506"
                    fill="#e4b50d"></path>
                <path
                    d="M546.499096 968.864665c152.265644 0 275.699255-123.433611 275.699255-275.699255 0-152.243066-123.433611-275.687966-275.699255-275.687966-76.121533 0-137.838338-61.728095-137.838338-137.849627 0-76.132822 61.716806-137.849627 137.838338-137.849628 228.398465 0 413.526304 185.150417 413.526304 413.560171 0 228.375887-185.127839 413.526304-413.526304 413.526305z"
                    p-id="3507" fill="#2de40d"></path>
                <path
                    d="M477.557349 1024c259.093178 0 470.422719-204.262645 481.93747-460.465846-11.469595 225.779424-198.155312 405.3418-426.802135 405.3418-132.035807 0-250.050712-59.933148-328.441328-154.015435l-67.835428 67.801562c87.308903 87.34277 207.908983 141.337919 341.141421 141.337919z"
                    p-id="3508" fill="#0d3ce4"></path>
              </svg>
            </div>
            <input @input="filterPlat" v-model="searchValue" class="search-input flex justify-center" placeholder="请输入平台名称" type="text">
            <div class="search-icon cursor-pointer">
              <svg @click="search" t="1705825946385" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="1669"
                   width="20" height="20">
                <path
                    d="M997.374066 1005.612975a62.540901 62.540901 0 0 1-88.464105 0l-209.512019-209.668371a438.630611 438.630611 0 1 1 90.527954-86.400255l207.604522 207.604521a62.540901 62.540901 0 0 1-0.156352 88.464105zM445.606965 111.278087a328.339731 328.339731 0 1 0 206.384974 583.60042 62.540901 62.540901 0 0 1 13.790268-20.888661 61.321354 61.321354 0 0 1 22.983781-14.165514A327.964486 327.964486 0 0 0 445.606965 111.278087z"
                    fill="#ffffff" p-id="1670"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="home-body-content">
        <div v-for="item in selfPlatforms" :key="item.kind">
          <div class="kind">{{ item.kind }}</div>
          <div class="platforms flex justify-center items-center">
            <div class="plat-item flex cursor-pointer"
                 v-for="plat in item.platforms"
                 :key="plat.id"
                 @click="goto({plat_id: plat.id})"
            >
              <div class="plat-logo">
                <div v-html="svgStrs[plat.name]"></div>
              </div>
              <div class="plat-content flex justify-center items-center">
                {{ plat.name_cn }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";

const svgStrs = {
  zabbix: '<svg t="1705828901309" class="icon" viewBox="0 0 1024 1024" width="50" height="50"><path d="M92.8 96v832h832V96h-832z m681.1904 725.5808H241.3056V738.816L624.384 299.0592a2225.1008 2225.1008 0 0 1-115.0464 3.4048h-245.376V219.7248h491.904v67.4304l-325.8624 381.952-62.8992 69.7088a1736.9088 1736.9088 0 0 1 128.64-5.0944h278.2464v87.8592z" fill="#D30201" p-id="7032"></path></svg>',
  netops: '<svg  class="icon" viewBox="0 0 1024 1024" width="50" height="50"><path d="M512 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512S0 794.7776 0 512 229.2224 0 512 0z m3.072 256h-6.144c-44.6208 0.2048-89.1392 4.352-133.0432 12.4672a133.7344 133.7344 0 0 0-107.4176 107.4432A753.024 753.024 0 0 0 256 509.9008v4.352c0.1536 44.928 4.3264 89.7792 12.4672 133.9648a133.7856 133.7856 0 0 0 107.4176 107.3152 750.4896 750.4896 0 0 0 272.2304 0 133.7856 133.7856 0 0 0 107.4176-107.4176 750.08 750.08 0 0 0 0-272.2048 133.76 133.76 0 0 0-107.4432-107.4432A753.4336 753.4336 0 0 0 515.072 256z m-94.7712 127.9744c4.8896-0.128 9.7792 0.768 14.3104 2.6368 3.8656 1.7152 7.3984 4.1216 10.3936 7.1168 3.456 3.5328 6.5536 7.424 9.216 11.5712 3.2512 4.9408 6.4768 9.8816 9.6768 14.848l119.168 123.5456v-125.184c0-11.4688 2.5088-20.1216 7.5776-25.856 5.12-5.7856 11.9552-8.6528 20.5824-8.6528 8.8832 0 15.9232 2.8672 21.0688 8.6528 5.1456 5.7344 7.7056 14.3872 7.7056 25.856v182.272c0 26.112-11.1104 39.2192-33.3824 39.2192-5.5552 0-10.5728-0.768-15.0272-2.3552a37.5552 37.5552 0 0 1-12.5184-7.424 72.6528 72.6528 0 0 1-10.8288-11.8272 708.6592 708.6592 0 0 1-10.0096-13.952l-116.224-121.472v122.4704c0 11.3664-2.7392 19.968-8.1408 25.8048-5.376 5.7856-12.9792 8.96-20.8896 8.704-8.7552 0-15.744-2.944-21.0432-8.832-5.2992-5.888-7.936-14.4384-7.936-25.6768v-177.7664c0-9.7792 1.1008-17.408 3.328-22.9632 2.6368-6.1184 7.0144-11.0848 13.1328-14.9248 6.144-3.8912 12.7232-5.8112 19.84-5.8112z" fill="#00BA26" p-id="6026"></path></svg>',
  gitlab: '<svg class="icon" viewBox="0 0 1024 1024" width="50" height="50"><path d="M932.317184 567.76704L885.10464 422.46144l-93.57312-287.997952c-4.8128-14.81728-25.776128-14.81728-30.590976 0L667.36128 422.459392H356.62848L263.051264 134.46144c-4.8128-14.81728-25.776128-14.81728-30.593024 0l-93.57312 287.997952-47.210496 145.309696a32.165888 32.165888 0 0 0 11.68384 35.96288l408.6272 296.890368L920.61696 603.734016c11.272192-8.192 15.990784-22.71232 11.68384-35.964928" fill="#FC6D26" p-id="5024"></path><path d="M512.002048 900.62848l155.365376-478.171136H356.634624z" fill="#E24329" p-id="5025"></path><path d="M512.004096 900.62848L356.63872 422.47168H138.901504z" fill="#FC6D26" p-id="5026"></path><path d="M138.891264 422.465536l-47.214592 145.309696a32.16384 32.16384 0 0 0 11.685888 35.96288L511.991808 900.62848z" fill="#FCA326" p-id="5027"></path><path d="M138.893312 422.459392h217.737216L263.053312 134.46144c-4.8128-14.819328-25.778176-14.819328-30.590976 0z" fill="#E24329" p-id="5028"></path><path d="M512.002048 900.62848l155.365376-478.154752H885.10464z" fill="#FC6D26" p-id="5029"></path><path d="M885.11488 422.465536l47.214592 145.309696a32.16384 32.16384 0 0 1-11.685888 35.96288L512.014336 900.62848z" fill="#FCA326" p-id="5030"></path><path d="M885.096448 422.459392H667.36128l93.577216-287.997952c4.814848-14.819328 25.778176-14.819328 30.590976 0z" fill="#E24329" p-id="5031"></path></svg>'
}

import {onBeforeUnmount, onMounted, ref} from "vue";
import {useOperate, useRequest} from "@/utils/hooks";
import {APIUri} from "@/api";

interface Platform {
  id: number
  url: string
  name: string
  description: string
}

interface KindPlatform {
  kind: string
  platforms: Platform[]
}

const router = useRouter()
const toPlatform = () =>{
  router.push({name: "PlatformSelf"})
}

const timerId = ref<any>(null)

const searchValue = ref("")
const selfPlatforms = ref<KindPlatform[]>([])

const search = () => {
  getSelfPlatforms().then(filterPlat)
}

const filterPlat = () => {
  console.log("------------------->")
  selfPlatforms.value = (source.value as KindPlatform[]).filter(item =>
      item.platforms.findIndex(plat => plat.name.indexOf(searchValue.value) > -1) > -1
  ).map(item => {
    return {...item, platforms: item.platforms.filter(plat => plat.name.indexOf(searchValue.value) > -1)}
  })
}

onMounted(() => {
  getSelfPlatforms().then(() => selfPlatforms.value = source.value)
})

const {data: source, run: getSelfPlatforms} = useRequest(
    APIUri.platform.self, {}, {manual: true})
const goto = useOperate(APIUri.platform.goto, {}, (data)=>{
  window.open(data.data)
})

const getTime = () => {
  const now = new Date()
  const minutes = now.getMinutes()
  if (minutes < 10) {
    return `${now.getHours()}:0${now.getMinutes()}`
  }
  return `${now.getHours()}:${now.getMinutes()}`
}
const getDate = () => {
  const now = new Date()
  return `${now.getMonth() + 1}-${now.getUTCDate()}`
}
const getWeek = () => {
  const now = new Date();
  const day = now.getDay();
  const weeks = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ]
  return weeks[day];
}

const time = ref(getTime())
const date = ref(getDate())
const week = ref(getWeek())

onMounted(() => {
  timerId.value = setInterval(() => {
    time.value = getTime()
  }, 1000)
})


onBeforeUnmount(() => {
  if (timerId.value) {
    clearInterval(timerId.value)
  }
})


</script>

<style scoped>
#home {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: url("/src/assets/bg.webp") center center / cover no-repeat;
  overflow-y: auto;
}

.home-body {
  margin-top: 10%;
  margin-bottom: 10%;
  text-align: center;
}

.home-body-nav {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.home-body-title {
  color: #fff;
  justify-content: center;
}

.home-body-title > .plat {
  font-size: 3.5rem;
  line-height: 1;
  font-weight: 700;
}

.line {
  font-size: 1.8rem;
  line-height: 2rem;
  margin-left: 10px;
  margin-right: 10px;
}

.home-body-title .time {
  font-size: 2rem;
  line-height: 2.25rem;
  font-weight: 700;
}

.home-body-title .date {
  margin-right: 5px;
}

.home-body-title .week {

}

.home-body-search {
  color: white;
  width: 70%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  /*padding: 0 20px;*/
}

.search-container {
  background: rgba(42, 42, 42, 0.42);
  border: 1px solid #ccc;
  transition: border-color .5s;
  padding: 2px 10px;
  border-radius: 1rem;
}

.search-input {
  background-color: transparent;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 10px 5px;
  border: none;
  outline: none;
  font-size: 17px;
}

.home-body-content {
  color: #fff;
}

.cursor-pointer {
  cursor: pointer;
}
.search-logo{
  margin-left: 5px;
  margin-right: 5px;
}
.search-icon {
  margin-right: 5px;
  margin-top: 5px;
}
.home-body-content{
  margin-top: 50px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.kind{
  text-align: left;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}
.platforms{
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
  margin-bottom: 30px;
}
.plat-item{
  background: rgba(42, 42, 42, 0.42);
  transition-duration: .2s;
  transition-property: all;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  border-radius: 1rem;
  font-weight: 700;
  font-size: 16px;
}
.plat-item:hover{
  box-shadow:0 0 20px rgba(0, 0, 0, 0.5);
}
.plat-logo{
  height: 70px;
  width: 70px;
  padding: 10px;
}
.system-btn{
  color: #fff;
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(42, 42, 42, 0.42);
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #7c7a7a;
}
.system-btn:hover{
  background: rgba(17, 16, 16, 0.52)
}
</style>
