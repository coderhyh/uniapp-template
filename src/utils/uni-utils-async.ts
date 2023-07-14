import { uni_promisify } from './uni-promisify'

export const hyh_getSetting = uni_promisify(uni.getSetting)

export const hyh_openSetting = uni_promisify(uni.openSetting)

export const hyh_hasPermission = async (permission: string) => {
  const res = await hyh_getSetting()
  return res.authSetting?.[permission]
}

export const hyh_authorize = (scope: string) => uni_promisify(uni.authorize)({ scope })

export const hyh_showModal = (options: UniApp.ShowModalOptions) =>
  uni_promisify(uni.showModal)(options).then((res) => res.confirm)
