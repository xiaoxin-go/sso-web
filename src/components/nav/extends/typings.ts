export interface Menu{
    path: string
    name: string
    icon: string
    children: Menu[]
    select: boolean
    apis: Api[]
}
export interface Api{
    uri: string
    method: string
    select: boolean
}
