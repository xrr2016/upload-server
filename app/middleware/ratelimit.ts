import * as Redis from 'ioredis'
import * as ratelimit from 'koa-ratelimit'

// const host = process.env.EGG_SERVER_ENV === 'prod' ? 'upload_server_redis' : '127.0.0.1'

export default () => {
  return ratelimit({
    driver: 'redis',
    db: new Redis(),
    duration: 60000,
    errorMessage: '请求次数超过限制',
    id: ctx => ctx.ip,
    headers: {
      remaining: 'Upload-Limit-Remaining',
      reset: 'Uplaod-Limit-Reset',
      total: 'Upload-Limit-Total',
    },
    max: 300,
    disableHeader: false,
  })
}
