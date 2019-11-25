import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  // oss: {
  //     enable: true,
  //     package: 'egg-oss',
  // },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
}

export default plugin
