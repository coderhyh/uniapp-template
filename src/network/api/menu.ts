import { request } from '../request'

interface IFoo {
  <T>(...args: any[]): Promise<T>
  abort?: () => void
}

export const getUserInfo: IFoo = <T>(num: number) =>
  request.get<T>({
    url: '/api/menu',
    abort: getUserInfo,
    header: {
      Authorization:
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIyMTIzMmYyOTdhNTdhNWE3NDM4OTRhMGU0YTgwMWZjMyIsImlkIjoxMDAwLCJpYXQiOjE2ODkxNzI4MTUsImV4cCI6MTY4OTIxNjAxNX0.NIoiauAgl3VeawyLfXFsrIHYeIClyTZSk2tyLDvu4KGjT457Y2M9NQgrPlN1y5dSnJh_YIV5nShmSMZnrA3oeNeFuIX42vQL1lU1W78J_jVO8CReNJJ2RVIzOQSMt7xzhRPoC7HeWDb2w-3XcD-3-yyfG2bFueTikGwbjxYKAk4ZB-oKqKPURaHi0uStqkFPR4Q4huw561OUev_FZN6OVoEtcA16OHticCCS4_JFVKFX-50ntIM9lS1NwIH1tGw_-1XRS2bIrRcRdOUgYvGSlS0UIahbi81lIAcDcrUghb5qYpdtV7q-I0eOpxDdxyMdNBHkJs4K2z2C5hP969GPQA'
    }
  })
