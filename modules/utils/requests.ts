import axios, {AxiosPromise} from "axios";
import {APIResult} from "../typing";

export const list = (uri: string, params: any): AxiosPromise =>{
    return axios.get(uri, {params:params})
}
export const create = (uri: string, params: any): AxiosPromise =>{
    return axios.post(uri, params)
}
export const update = (uri: string, params: any): AxiosPromise =>{
    return axios.put(uri, params)
}
export const del = (uri: string, params: any): AxiosPromise => {
    return axios.delete<APIResult>(uri, {params: params})
}
export const post = (uri: string, params: any):  AxiosPromise =>{
    return axios.post(uri, params)
}
