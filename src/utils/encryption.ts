import CryptoJS from 'crypto-js'

// 密钥
const _key = CryptoJS.lib.WordArray.create([1, 2, 3, 4, 5])

// 加密函数
export function encryptData(data: any, key = _key) {
  const res = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(res, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

// 解密函数
export function decryptData(encryptedData: string, key = _key) {
  try {
    const decrypt = CryptoJS.AES.decrypt(encryptedData, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    const res = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString())
    return res
  } catch (error) {
    return encryptedData
  }
}
