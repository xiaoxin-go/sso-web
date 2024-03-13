import {ref} from "vue";
import {VAFormItem} from "./typing";

// 初始化表单必填项校验
export const useRules = (items: Array<VAFormItem>) => {
    const rules = ref({})
    const init = () => {
        const data: { [key in string]: Array<{ required: boolean, message: string }> } = {}
        items.forEach(item => {
            if (item.required)
                data[item.key] = [{required: true, message: `${item.label}不能为空`}];
        })
        rules.value = data
    }
    init()
    return {rules}
}
