import { Controller } from 'egg'
import { Provider } from '../params'

class ParamsCheckError extends Error {

  message: string
  status: number

  constructor(msg) {
    super()
    this.message = msg
    this.status = 400
  }
}

export default class OssController extends Controller {
  public async upload() {
    const { ctx, config } = this

    if (!ctx.get('Content-Type').startsWith('multipart/form-data')) {
      throw new ParamsCheckError('请求头 Content-Type 应该为 multipart/form-data')

    }

    const body = ctx.request.body
    const files = ctx.request.files

    const rules = {
      folder: { type: 'string', required: false, default: '/', trim: true },
      provider: { type: 'string', required: false, default: Provider.ALIBABA },
      bucket: { type: 'string', required: false, default: config[Provider.ALIBABA].bucket },
    }

    await ctx.validate(rules, body)

    if (!files || files.length < 1) {
      throw new ParamsCheckError('请添加上传文件')
    }

    for (const file of files) {
      if (!file.field) {
        ctx.status = 400
        throw new ParamsCheckError('上传文件需要设置 field')

      }
    }

    ctx.body = await ctx.service.oss.upload(body, files)
  }
}
