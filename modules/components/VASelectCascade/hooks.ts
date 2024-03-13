import { ref, Ref} from "vue";
import {VASelectCascadeOptions} from "./typings";
import {KeyValueType, QueryParams} from "../../typing";


export const useSelectCascadeHandler = (options: VASelectCascadeOptions, emit: any) =>{
    const parentValue: Ref = ref()
    const childRef: Ref = ref({})
    const child: Ref = ref({})
    // 初始化级联子属性，不主动远程获取值
    const _initChild = () =>{
        child.value = options?.child
        child.value.manual = false
    }
    _initChild()
    const _parseParams = (value: any): KeyValueType | QueryParams =>{
        const params = child.value.defaultParams || {}
        params[options.child.params.field] = value
        if (options.child.params.type === 'query'){
            const result: QueryParams = {query: []}
            for (const k in params){
                result.query.push({key: k, val: params[k].toString(), type: options.child.params.queryType || 'eq'})
            }
            return result
        }
        return params
    }
    // 改变父元素时，将子属性值从数据中删除，并且调用子元素接口
    const changeParent = (value: any) => {
        emit("update:value", null)
        const params = _parseParams(value)
        childRef.value.load(params)
    }
    return {parentValue, child, childRef, changeParent}
}
