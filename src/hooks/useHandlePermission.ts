import { hyh_authorize, hyh_hasPermission, hyh_openSetting, hyh_showModal } from '~/utils'

export const useHandlePermission = async (permission_msg: string, permission: string, isShowModal = true) => {
  let hasPermission = await hyh_hasPermission(permission)
  if (!hasPermission) {
    hasPermission = await hyh_authorize(permission).catch(() => false)
    console.log(hasPermission)
    if (!hasPermission && isShowModal) {
      const flag = await hyh_showModal({
        title: '提示',
        content: `我们需要您的${permission_msg}权限`
      })
      if (flag) {
        await hyh_openSetting()
        hasPermission = await hyh_hasPermission(permission)
        if (!hasPermission) throw new Error('获取权限失败')
      } else throw new Error('获取权限失败')
    }
  }
}
