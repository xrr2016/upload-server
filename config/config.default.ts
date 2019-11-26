import * as dotenv from 'dotenv'
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import { Provider } from '../app/params'

dotenv.config()

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  config.keys = appInfo.name + '_1574657083570_8776'

  config.middleware = [
    'logger',
  ]

  config.security = {
    csrf: false,
  }

  config.logger = {}

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }

  config.alinode = {
    appid: process.env.ALINODE_APPID,
    secret: process.env.ALINODE_SECRET,
  }

  config.multipart = {
    mode: 'file',
  }

  config[Provider.ALIBABA] = {
    bucket: process.env.OSS_BUCKET,
    region: process.env.OSS_REGION,
    accessKeyId: process.env.OSS_ACCESSKEYID,
    accessKeySecret: process.env.OSS_ACCESSKEYSECRET,
  }

  config.onerror = {
    all(err, ctx) {
      ctx.status = err.status || 500
      ctx.body = JSON.stringify({
        code: err.status,
        success: false,
        message: err.message,
      })
    },
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
  }
};