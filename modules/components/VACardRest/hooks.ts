import {Ref, ref} from "vue";
import {create, update} from "../../../src/api";
import {notify} from "@kyvg/vue3-notification";

export const useDrawer = (uris: any) =>{
    const visible = ref(false)
    const title = ref("")
    const data: Ref = ref({})
    const clickUpdate = (record: any) =>{
        data.value = {...record}
        visible.value = true
        title.value = "修改"
    }
    const clickAdd = () =>{
        data.value = {}
        visible.value = true
        title.value = '添加'
    }
    const submit = (reload: () => void) =>{
        const run = async () =>{
            let res: any;
            if (title.value === "添加") {
                if (uris?.create) {
                    res = await create(uris.create, data.value);
                }
            } else {
                if (uris?.update) {
                    res = await update(uris.update, data.value);
                }
            }
            if (res && res.data.code === 0) {
                notify({type: 'success', text: res.data.msg})
                visible.value = false;  // 关闭抽屉
                reload();   // 重载表格数据
            }
        }
        run()
        visible.value = false
    }

    return {visible, data, clickAdd, clickUpdate, submit, title}
}
