import {computed, Ref, ref} from "vue";
import {list} from "../../../utils/requests";
import {VATableColumn, VATableRecord} from "./typing";
import {useRoute} from "vue-router";

// 格式化table的值
export const formatRecordValue = (record: VATableRecord | undefined, column: VATableColumn): string => {
    // 如果format回调函数存在则调用函数
    if (column.valueFormat) {
        return column.valueFormat(record as VATableRecord)
    }
    // 如果dataIndex或者数据为空，返回空
    if (!column.dataIndex || !record) return ''
    if(!(column.dataIndex in record)) return ''
    // 对时间进行处理，转化为本地时间
    if (column.dataIndex === 'updated_at' || column.dataIndex === 'created_at') {
        return new Date(record[column.dataIndex].toString()).toLocaleString()
    }
    return record[column.dataIndex].toString()
}

export const useRequestPagination = (uri: string | undefined, defaultParams: any, page: number, size: number, to: any, manual?: boolean, format?: (data: any)=>any) => {
    const current = ref(page)
    const pageSize = ref(size)
    const total = ref(0)
    const loading = ref(false)
    const data = ref([])
    const params = ref(defaultParams || {})

    const pagination = computed(() => ({
        total: total.value,
        current: current.value,
        pageSize: pageSize.value,
        defaultPageSize: 20,
        showTotal: (total: number) => `共 ${total} 条`
    }))

    const pageParams = computed(() => ({
        page: current.value,
        size: pageSize.value,
    }))

    const run = async () => {
        if (!uri) return

        loading.value = true
        const res = await list(uri, {...params.value, ...pageParams.value})
        if (res.data.code === 0) {
            // 如果有format则使用format，自定义的逻辑处理
            if (format){
                data.value = format(res.data.data);
            }else{
                data.value = res.data.data;
            }
            total.value = res.data.count
        }
        loading.value = false;
        to()
    }

    const handleTableChange = (pag: { pageSize: number; current: number }) => {
        current.value = pag.current;
        pageSize.value = pag.pageSize
        run()
    }

    const reload = (newParams: any) =>{
        params.value = {...defaultParams, ...newParams}
        current.value = newParams.page || 1
        pageSize.value = newParams.size || 20
        run()
    }
    if (!manual){
        run()
    }
    return {loading, total, data, reload, pagination, handleTableChange}
}

type Key = number | string
export const useSelection = () =>{
    const data: Ref = ref([])
    const change = (selectedRowKeys: Key[]) =>{
        console.log("selectkeys-=>", selectedRowKeys)
        data.value = selectedRowKeys
    }
    return {data, change}
}
