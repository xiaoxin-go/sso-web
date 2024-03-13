import {store} from "@/store";

import {ref, Ref, computed} from "vue";
import {RestfulUris} from "modules/typing";
import {APIUri} from "@/api";


interface Api {
    method: string,
    uri: string
}

interface Permission {
    desc: string,
    apis: Api[]
}

type Permissions = { [key: string]: { [key: string]: Permission } } // {string: {string: Permission}}

const permissions: Permissions = {
    '/system/user': {
        'list': {apis: [{method: 'GET', uri: APIUri.system.user.restful.list}], desc: '获取用户列表'},
        'create': {apis: [{method: 'POST', uri: APIUri.system.user.restful.create}], desc: '添加用户'},
        'update': {apis: [{method: 'PUT', uri: APIUri.system.user.restful.update}], desc: '更新用户信息'},
        'delete': {apis: [{method: 'DELETE', uri: APIUri.system.user.restful.delete}], desc: '删除用户'},
    },
    '/system/role': {
        'list': {apis: [{method: 'GET', uri: APIUri.system.role.restful.list}], desc: '获取角色列表'},
        'create': {apis: [{method: 'POST', uri: APIUri.system.role.restful.create}], desc: '添加角色'},
        'update': {apis: [{method: 'PUT', uri: APIUri.system.role.restful.update}], desc: '更新角色信息'},
        'delete': {apis: [{method: 'DELETE', uri: APIUri.system.role.restful.delete}], desc: '删除角色'},
    },
    '/system/menu': {
        'list': {apis: [{method: 'GET', uri: APIUri.system.menu.restful.list}], desc: '获取菜单列表'},
        'create': {apis: [{method: 'POST', uri: APIUri.system.menu.restful.create}], desc: '添加菜单'},
        'update': {apis: [{method: 'PUT', uri: APIUri.system.menu.restful.update}], desc: '更新菜单信息'},
        'delete': {apis: [{method: 'DELETE', uri: APIUri.system.menu.restful.delete}], desc: '删除菜单'},
    },
    '/system/api': {
        'list': {apis: [{method: 'GET', uri: APIUri.system.api.restful.list}], desc: '获取接口列表'},
        'create': {apis: [{method: 'POST', uri: APIUri.system.api.restful.create}], desc: '添加接口'},
        'update': {apis: [{method: 'PUT', uri: APIUri.system.api.restful.update}], desc: '更新接口信息'},
        'delete': {apis: [{method: 'DELETE', uri: APIUri.system.api.restful.delete}], desc: '删除接口'},
    },
    '/system/log': {
        'list': {apis: [{method: 'GET', uri: APIUri.system.log.restful.list}], desc: '获取日志列表'}
    },
    '/tenement': {
        'list': {apis: [{method: 'GET', uri: APIUri.tenement.restful.list}], desc: '获取租户列表'},
        'create': {apis: [{method: 'POST', uri: APIUri.tenement.restful.create}], desc: '添加租户'},
        'update': {apis: [{method: 'PUT', uri: APIUri.tenement.restful.update}], desc: '更新租户信息'},
        'delete': {apis: [{method: 'DELETE', uri: APIUri.tenement.restful.delete}], desc: '删除租户'},
    },
    '/platform': {
        'list': {apis: [{method: 'GET', uri: APIUri.platform.restful.list}], desc: '获取平台列表'},
        'create': {
            apis: [
                {method: 'POST', uri: APIUri.platform.restful.create},
                {method: 'GET', uri: APIUri.platformKind.restful.list}
            ], desc: '添加平台'
        },
        'update': {
            apis: [
                {method: 'PUT', uri: APIUri.platform.restful.update},
                {method: 'GET', uri: APIUri.platformKind.restful.list}], desc: '更新平台信息'
        },
        'delete': {apis: [{method: 'DELETE', uri: APIUri.platform.restful.delete}], desc: '删除平台'},
    },
    '/platform_user': {
        'list': {apis: [{method: 'GET', uri: APIUri.platformUser.restful.list}], desc: '获取平台用户列表'},
        'create': {
            apis: [
                {method: 'POST', uri: APIUri.platformUser.restful.create},
                {method: 'GET', uri: APIUri.platform.restful.list},
            ], desc: '添加平台用户'
        },
        'update': {
            apis: [
                {method: 'PUT', uri: APIUri.platformUser.restful.update},
                {method: 'GET', uri: APIUri.platform.restful.list},
            ], desc: '更新平台用户信息'
        },
        'delete': {apis: [{method: 'DELETE', uri: APIUri.platformUser.restful.delete}], desc: '删除平台用户'},
    },
    '/platform_kind': {
        'list': {apis: [{method: 'GET', uri: APIUri.platformKind.restful.list}], desc: '获取平台用户列表'},
        'create': {apis: [{method: 'POST', uri: APIUri.platformKind.restful.create},], desc: '添加平台用户'},
        'update': {apis: [{method: 'PUT', uri: APIUri.platformKind.restful.update},], desc: '更新平台用户信息'},
        'delete': {apis: [{method: 'DELETE', uri: APIUri.platformKind.restful.delete}], desc: '删除平台用户'},
    },
}

const authEnabled = true

export class Auth {
    private readonly _menu: string
    private _permissions?: { [key: string]: Permission }
    private _menuPermissions: Ref<Array<Api>> = ref([])

    constructor(menu?: string) {
        this._menu = menu || store.currentPath
        this.initPermission()
        this.initMenuPermissions().then()
    }

    private initMenuPermissions = async () => {
        if (this._menuPermissions.value.length > 0) {
            return
        }
        this._menuPermissions.value = store.auths[this._menu]
    }
    private initPermission = () => {
        if (!this._menu) {
            console.warn(`${store.currentPath}对应的menu信息不存在`)
            return
        }
        if (!permissions[this._menu]) {
            console.warn(`${this._menu}对应的权限信息不存在`)
            return
        }
        this._permissions = permissions[this._menu]
    }
    private _checkAuth = (operate: string) => {
        console.log("permissions: ", this._permissions, operate)
        console.log("menuPermissions: ", this._menuPermissions.value, operate)
        if (this._menu.startsWith("/admin")) return true    // 临时规则
        if (!this._permissions) {
            return false
        }
        const permission = this._permissions[operate]     // 获取预定义auth目录下当前菜单下操作的apis
        if (!permission) {
            console.warn(`${this._menu}-${operate}对应的权限信息不存在`)
            return false
        }
        for (const api of permission.apis) {              // 循环当前操作需要的所有apis
            if (this._menuPermissions.value.findIndex(item => item.method == api.method && item.uri == api.uri) == -1) {   // 如果返回的权限列表里有一个不存在则返回false
                return false
            }
        }
        return true
    }
    public useIsAuth = (operate: string) => {
        if (!authEnabled) {
            return true
        }
        return computed(() => {
            return this._menuPermissions.value.length > 0 && this._checkAuth(operate);
        })
    }
    public _getRestfulUris = (uris: RestfulUris) => {
        console.log("uris: ", uris)
        const result = {} as any
        let k: keyof RestfulUris
        for (k in uris) {          // 此k = [list, create, update, get, delete]
            if (this._checkAuth(k)) {
                result[k] = uris[k]       // 有权限则追加进去
            }
        }
        return result
    }
    // 根据当前页面的权限来控制uris, uris={list: '', get: '', create: '', update: '', delete: ''}
    // 对比auth预定义的当前菜单operate(预定义的也有list,create,update,delete)，来判断每个的权限，如果存在则添加到结果里
    public useRestfulUris = (uris: RestfulUris) => {
        if (!authEnabled) return uris
        return computed(() => {
            return this._menuPermissions.value?.length > 0 ? this._getRestfulUris(uris) : {}
        })
    }
}
