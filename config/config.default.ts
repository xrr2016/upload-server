import * as os from 'os'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

import { Provider } from '../app/params'

dotenv.config()

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  config.keys = appInfo.name + '_1574657083570_8776'

  config.middleware = [
    'logger',
    'payload',
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
    mode: 'stream',
    fileSize: '50mb',
    tmpdir: path.join(os.tmpdir(), 'egg-multipart-tmp', appInfo.name),
    cleanSchedule: {
      cron: '0 30 4 * * *',
    },
    fileExtensions: [ '.pdf', '.doc', '.docx' ],
  }

  config[Provider.ALIBABA] = {
    bucket: process.env.OSS_BUCKET,
    region: process.env.OSS_REGION,
    accessKeyId: process.env.OSS_ACCESSKEYID,
    accessKeySecret: process.env.OSS_ACCESSKEYSECRET,
    bucketWhitelist: process.env.OSS_BUCKET_WHITELIST,
  }

  config.onerror = {
    all(err, ctx) {
      ctx.status = err.status || 500

      ctx.body = JSON.stringify({
        code: ctx.status,
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
