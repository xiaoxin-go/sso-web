import {ref} from "vue";
import {list} from "../../utils/requests";
import {CascaderItem, VACascaderOptions} from "./typings";

export const useCascaderHandler = (options: VACascaderOptions) => {
    const data = ref()
    const run = async () => {
        if (!options.uri)
            return
        const res = await list(options.uri, {})
        if(res.data.code !== 0){
            return
        }
        data.value = parseCascaderData(res.data.data, options.label, options.value)
    }
    if (options.manual !== false){
        run()
    }
    return {data, run}
}
const parseCascaderData = (data: any, label?: string, value?: string) => {
    if(!label || !value){
        return data
    }
    return data.map((item: any) => {
        const newData: any = { label: item[label], value: item[value] }
        if (!item.children) {
            return newData
        }
        newData.children = parseCascaderData(item.children, label, value)
        return newData
    })
}
