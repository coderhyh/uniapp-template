export function uni_promisify<T extends (...args: [Object, ...any[]]) => any>(this: any, fn: T) {
  return (...options: Parameters<T>) =>
    new Promise<any>((resolve, reject) => {
      fn.call(
        this,
        {
          success(res: any) {
            resolve(res)
          },
          fail(e: any) {
            console.log(e)
            reject(e)
          },
          ...options[0]
        },
        ...options.slice(1)
      )
    })
}
