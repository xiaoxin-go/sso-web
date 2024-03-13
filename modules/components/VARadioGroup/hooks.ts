import {ref} from "vue";
import {list} from "../../utils/requests";
import {KeyValueType} from "../../typing";
import {VARadioOptions} from "./typings";

export const useRadioGroupHandler = (op: VARadioOptions) => {
    const data = ref()
    const run = async () => {
        if (!op.uri)
            return
        const res = await list(op.uri, {})
        if(res.data.code !== 0){
            return
        }
        data.value = res.data.data.map((item: KeyValueType) => {
            return {
                label: op.label ? item[op.label] : item,
                value: op.value ? item[op.value] : item
            }
        })
    }
    run()
    return {data}
}
