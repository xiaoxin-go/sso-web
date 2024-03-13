import {Ref, ref} from "vue";
import {KeyValueType} from "../../typing";
import {LabelValue, VASelectOptions} from "./typings";
import {list} from "../../utils/requests";

export const useSelectHandler = (op: VASelectOptions) => {
    const data: Ref<Array<LabelValue>> = ref([])
    const run = async (params?: KeyValueType) => {
        if (!op.uri)
            return
        const res = await list(op.uri, params || {})
        if(res.data.code !== 0){
            return
        }
        data.value = res.data.data.map((item: KeyValueType) => {
            let label, value
            if (op.labelFormat)
                label = op.labelFormat(item)
            else
                label = op.label ? item[op.label] : item

            if(op.valueFormat)
                value = op.valueFormat(item)
            else
                value = op.value ? item[op.value] : item
            return {label: label, value: value}
        })
    }
    if(op.data){
        data.value = op.data
    }
    // 如果开启手动，第一次不加载数据
    if (op.manual !== true){
        run(op.defaultParams as KeyValueType)
    }
    return {data, run}
}
