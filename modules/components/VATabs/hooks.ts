import {ref, Ref} from "vue";
import {KeyValueType} from "../../typing";
import {list} from "../../utils/requests";
import {TabsItem, VATabsOptions} from "./typings";

// 获取远程tabs数据
export const useTabsHandler = (op: VATabsOptions) => {
    const data: Ref<Array<TabsItem>> = ref([])
    const run = async () => {
        if (!op.uri)
            return
        const res = await list(op.uri, op.params || {})
        if(res.data.code !== 0){
            return
        }
        data.value = res.data.data.map((item: KeyValueType) => {
            let label, value
            if (op.labelFormat)
                label = op.labelFormat(item)
            else
                label = op.label ? item[op.label] : item
            if (op.valueFormat)
                value = op.valueFormat(item)
            else
                value = op.value ? item[op.value] : item
            return {label: label, value: value}
        })
    }
    run()
    return {data, run}
}
