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
  cors: {
    enable: true,
    package: 'egg-cors',
  },
}

export default plugin
