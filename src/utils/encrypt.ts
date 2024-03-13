import { JSEncrypt } from "jsencrypt"
import {v4 as uuidv4} from 'uuid';

// 生成16位随机operateId
export const GeneOperateId = (): string => {
  return uuidv4()
}

export const Encrypt = (public_key: string, msg: any): any => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(public_key);
  return encrypt.encrypt(msg);
}

export function Decrypt(public_key: string, msg: any): any {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(public_key)
  return encrypt.decrypt(msg)
}
