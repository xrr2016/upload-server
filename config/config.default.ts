import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import { Provider } from '../app/params'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  config.keys = appInfo.name + '_1574657083570_8776'

  config.middleware = []

  config.security = {
    csrf: false,
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }

  config.alinode = {
    appid: '82670',
    secret: 'b1b9864ca50d0ced93c43785029a9b1f1dec228c',
  }

  config.multipart = {
    mode: 'file',
  }

  config[Provider.ALIBABA] = {
    bucket: 'deepexi-moby',
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAI4755mDlzKWCK',
    accessKeySecret: 'VASAQnQttTkSBUNJr2YEkqW3JXnkyi',
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
