import {Api, Menu} from "@/components/nav/extends/typings";
import {store} from "@/store";

export const initAuths = (menus: Menu[]) =>{
    if(!menus || menus.length == 0){
        return
    }
    menus.forEach(menu=>{
        if (menu.apis && menu.apis.length > 0){
            store.auths[menu.path] = menu.apis.filter(api=>api.select).map(api=>{
                return {method: api.method, uri: api.uri} as Api
            })
        }
        initAuths(menu.children)
    })
}
