import {get, APIUri} from "@/api";
import {ref} from "vue";
import {store} from "@/store";
import {SetUserInfo} from "@/utils/storage";

export const GetMenu = async () => {
    const res = await get(APIUri.auth.getMenu, {})
    if (res.data.code === 0) {
        store.menuList = res.data.data
    }
}

export const GetUserInfo = () => {
    const data = ref({})
    const run = async () => {
        const res = await get(APIUri.auth.getUserInfo, {})
        if (res.data.code === 0) {
            data.value = res.data.data
            store.userInfo = res.data.data
            SetUserInfo(res.data.data)
        }
    }
    run()
    return {data, run}
}
