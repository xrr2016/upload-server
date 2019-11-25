import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import { Provider } from '../app/params'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574657083570_8776'

  // add your egg config in here
  config.middleware = []

  config.security = {
    csrf: false,
  }

  config.multipart = {
    mode: 'file',
  }

  config[Provider.ALIOSS] = {
    bucket: 'deepexi-moby',
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAI4755mDlzKWCK',
    accessKeySecret: 'VASAQnQttTkSBUNJr2YEkqW3JXnkyi',
  }

  config.onerror = {
    all(err, ctx) {
      ctx.body = JSON.stringify(err)
    },
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
  }
};
