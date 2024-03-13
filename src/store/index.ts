import { reactive } from "vue";
import {Api} from "@/components/nav/extends/typings";

export const store = reactive({
  userInfo: { username: "" },
  menuList: [],
  menuPermissions: [] as any,
  currentPath: '',
  spinning: false,
  auths: {} as { [key: string]: Api[] }
})
