import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { notify } from "@kyvg/vue3-notification";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res.status !== 200){
            notify({ type: 'error', text: '请求失败' })
            return res;
        }
        console.log("res-------->", res)
        if (res.data?.code && res.data.code != 0) {
            if(res.config.method == 'get' && res.config.url != "/auth/menus"){
                notify({ type: 'error', text: res.data.msg, duration: 5*1000})
            }
            if(res.data.code == 405){
                window.location.href = '#/login';
            }
        }
        return res;
    },
    (error) => {
        if (error.response.status === 404) {
            notify({ type: 'error', text: '404 not found' })
        }
        if (error.response.status === 500 || error.response.status === 502) {
            notify({ type: 'error', text: '服务器错误' })
        }
        return {};
    }
);

export const APIUri = {
    BaseUri: '/api/v1',
    auth: {
        login: '/auth/login',
        logout: '/auth/logout',
        register: '/auth/register',
        check: '/auth/check',
        getPublicKey: '/auth/public_key',
        sendEmailCode: '/auth/send_email_code',
        verifyEmailCode: '/auth/verify_email_code',
        getOtpQrCode: '/auth/otp_qr_code',
        verifyOtpCode: '/auth/verify_otp_code',
        getUserPermissions: '/auth/userPermissions',
        getMenu: '/auth/menus',
        getUserInfo: '/auth/user_info',
    },
    system: {
        user: {
            restful:{
                list: '/system/users',
                create: '/system/user',
                update: '/system/user',
                delete: '/system/user'
            }
        },
        role: {
            restful:{
                list: '/system/roles',
                create: '/system/role',
                update: '/system/role',
                delete: '/system/role'
            },
            getPermission: '/system/role/permission',
            updatePermission: '/system/role/permission',
        },
        menu: {
            restful:{
                list: '/system/menus',
                create: '/system/menu',
                update: '/system/menu',
                delete: '/system/menu'
            }
        },
        api: {
            restful:{
                list: '/system/apis',
                create: '/system/api',
                update: '/system/api',
                delete: '/system/api'
            }
        },
        log: {
            restful:{
                list: '/system/logs',
            }
        }
    },
    platform: {
        restful:{
            list: '/platforms',
            create: '/platform',
            update: '/platform',
            delete: '/platform'
        },
        self: '/platform/self',
        goto: '/platform/goto',
    },
    platformUser: {
        restful:{
            list: '/platform_users',
            create: '/platform_user',
            update: '/platform_user',
            delete: '/platform_user'
        }
    },
    platformKind: {
        restful:{
            list: '/platform_kinds',
            create: '/platform_kind',
            update: '/platform_kind',
            delete: '/platform_kind'
        }
    },
    tenement: {
        restful:{
            list: '/tenements',
            create: '/tenement',
            update: '/tenement',
            delete: '/tenement'
        },
        getUsers: '/tenement/users',
        updateUsers: '/tenement/users',
        getPlatforms: '/tenement/platforms',
        updatePlatforms: '/tenement/platforms',
    },
}

axios.defaults.baseURL = APIUri.BaseUri;

type APIResult = {
    code: number;
    msg: string;
    data: any;
};

export const get = (uri: string, params?: any, config?: AxiosRequestConfig): AxiosPromise => {
    return axios.get<APIResult>(uri, {params:params, ...config});
};
export const post = (uri: string, data: any, config?: AxiosRequestConfig): AxiosPromise => {
    return axios.post(uri, data, config);
};
export const put = (uri: string, data: any): AxiosPromise => {
    return axios.put<APIResult>(uri, data);
};
export const del = (uri: string, id: number | string): AxiosPromise => {
    return axios.delete<APIResult>(uri, { params:{id: id }});
};

