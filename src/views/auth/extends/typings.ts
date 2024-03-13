export interface LoginRequest{
    username: string
    password: string
    code: string,
    operate_id: string
}

export interface ValidEmailRequest{
    email: string
    operate_id: string
    code: string | null
}
export interface ValidOtpRequest{
    operate_id: string
    code: number | null
}
