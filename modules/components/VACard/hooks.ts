import {computed, ref} from "vue";
import {list} from "../../utils/requests";

export const useRequestPagination = (uri?: string, defaultParams?: any) => {
    const current = ref(1)
    const pageSize = ref(20)
    const total = ref(0)
    const loading = ref<boolean>(false)
    const data = ref([])

    const pagination = computed(() => ({
        total: total.value,
        current: current.value,
        pageSize: pageSize.value,
    }))

    const pageParams = computed(() => ({
        page: current.value,
        size: pageSize.value,
    }))

    const run = async (params: any) => {
        if (!uri) return
        loading.value = true
        const res = await list(uri, {...params, ...pageParams.value})
        if (res.data.code === 0) {
            data.value = res.data.data;
            total.value = res.data.count
        }
        loading.value = false;
    }

    const handleTableChange = (page: number, size: number) => {
        current.value = page
        pageSize.value = size
        run(defaultParams)
    }
    run(defaultParams)
    return {loading, total, data, run, pagination, handleTableChange}
}
