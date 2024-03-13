import { get, post } from "@/api";
import { ref } from "vue";
import { notify } from "@kyvg/vue3-notification";
import {Modal} from "ant-design-vue";

export interface RequestOptions {
  manual?: boolean
  format?: (data: any) => any,
  default?: any
}

export const sleep = (interval: number) => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve()
    }, interval);
  })
}

export const useRequest = (uri: string, params?: any, options?: RequestOptions, callback?: (data: any)=> void) => {
  const data = ref<any>(options?.default || {})
  const loading = ref(false)
  const run = async (newParams?: any) => {
    loading.value = true
    const res = await get(uri, newParams || params)
    if (res.data.code === 0) {
      if (options?.format){
        data.value = options.format(res.data.data)
      } else{
        data.value = res.data.data
      }
      if(callback){
        callback(data.value)
      }
    } else {
      return data.value = []
    }
    loading.value = false
  }
  if (options?.manual !== true) {
    run(params)
  }
  return { data, run, loading }
}

export const useOperate = (uri: string, params?: any, callback?: (data: any)=> void ) => {
  return async (newParams?: any) => {
    const res = await post(uri, newParams || params)
    if (res.data.code === 0) {
      notify({ type: 'success', text: res.data.msg })
      if(callback){
          callback(res.data)
      }
    }else{
      setTimeout(() => {
        Modal.error({
          title: '操作失败',
          content: res.data.msg,
        });
      }, 200)
    }
    return res
  }
}
