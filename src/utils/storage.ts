const SsoUserInfoKey = "SSO_PUBLIC_USER_INFO";
const MenuKey = "SSO_MENU_LIST";
const MenuPermissionsKey = "YOPS_MENU_PERMISSIONS"
export const SetUserInfo = (data: any) => {
  localStorage.setItem(SsoUserInfoKey, JSON.stringify(data))
}
export const GetLocalStorageUserInfo = () => {
  const result = sessionStorage.getItem(SsoUserInfoKey)
  if (result) {
    return JSON.parse(result)
  }
  return {}
}
export const SetMenuPermissions = (menu: string, permissions?: string[]) => {

  if (permissions) {
    sessionStorage.setItem(`${MenuPermissionsKey}:${menu}`, JSON.stringify(permissions))
  }
}
export const GetMenuPermissions = (menu: string) => {
  const result = sessionStorage.getItem(`${MenuPermissionsKey}:${menu}`)
  if (result) {
    return JSON.parse(result)
  }
  return null
}
export const delUserInfo = () => {
  sessionStorage.removeItem(SsoUserInfoKey)
}
export const delMenu = () => {
  sessionStorage.removeItem(MenuKey)
}
export const clearPublicInfo = () => {
  delUserInfo();
  delMenu();
}
