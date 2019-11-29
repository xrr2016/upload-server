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
    const body = ctx.request.body

    if (!ctx.get('Content-Type').startsWith('multipart/form-data')) {
      throw new ParamsCheckError('请求头 Content-Type 应该为 multipart/form-data')
    }

    const rules = {
      folder: { type: 'string', required: false, default: '/', trim: true },
      provider: { type: 'string', required: false, default: Provider.ALIBABA },
      bucket: { type: 'string', required: false, default: config[Provider.ALIBABA].bucket },
    }

    await ctx.validate(rules, body)

    if (body.provider === Provider.ALIBABA) {
      const bucket = body.bucket
      const bucketWhitelist = config[Provider.ALIBABA].bucketWhitelist

      if (!bucketWhitelist.includes(bucket)) {
        throw new ParamsCheckError(`请使用以下的 bucket: ${bucketWhitelist.toString()}`)
      }
    } else {
      throw new ParamsCheckError('不支持的 provider')
    }

    let stream

    try {
      stream = await ctx.getFileStream()
    } catch (e) {
      throw new ParamsCheckError('请添加上传文件')
    }

    ctx.body = await ctx.service.oss.upload(body, stream)
  }
}
