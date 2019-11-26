import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  alinode: {
    enable: true,
    package: 'egg-alinode',
  },
}

export default plugin
