interface requestConfig extends Partial<UniApp.RequestOptions> {
  baseUrl: string
  // getRequestTask?: (task: UniApp.RequestTask) => void
  abort?: {
    abort?: () => void
  }
}

export class Request {
  private config: requestConfig = {
    baseUrl: import.meta.env.VITE_BASE_URL,
    timeout: 1000 * 60
  }

  constructor(config?: requestConfig) {
    if (config) {
      this.config = config
    }
  }

  private beforeRequestInterceptor(config: Omit<requestConfig, 'baseUrl'>) {
    console.log('发出请求之前拦截器', config)

    return config
  }

  private responseSuccessInterceptor(result: UniApp.RequestSuccessCallbackResult) {
    console.log('请求响应成功拦截器', result)

    return result.data
  }

  private responseFailInterceptor(err: UniApp.GeneralCallbackResult) {
    console.log('请求响应失败拦截器', err)

    return err
  }

  async request<T = any>(config: Omit<requestConfig, 'baseUrl'>) {
    return new Promise<T>((resolve, reject) => {
      config = this.beforeRequestInterceptor(config)

      const requestTask = uni.request({
        ...config,
        url: this.config.baseUrl + config.url,
        success: (res) => {
          const result = this.responseSuccessInterceptor(res)
          resolve(<T>result)
        },
        fail: (err) => {
          const result = this.responseFailInterceptor(err)
          reject(result)
        }
      })

      if (config.abort) {
        config.abort.abort = requestTask.abort.bind(requestTask)
      }
    })
  }

  post<T = any>(config: Omit<requestConfig, 'baseUrl'>) {
    return this.request<T>({
      ...config,
      method: 'POST'
    })
  }
  get<T = any>(config: Omit<requestConfig, 'baseUrl'>) {
    return this.request<T>({
      ...config,
      method: 'GET'
    })
  }
  delete<T = any>(config: Omit<requestConfig, 'baseUrl'>) {
    return this.request<T>({
      ...config,
      method: 'DELETE'
    })
  }
  put<T = any>(config: Omit<requestConfig, 'baseUrl'>) {
    return this.request<T>({
      ...config,
      method: 'PUT'
    })
  }
}

export const request = new Request()
