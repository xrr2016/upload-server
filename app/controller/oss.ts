import { Controller } from 'egg'
import { Provider } from '../params'

export default class OssController extends Controller {

  private error(msg) {
    const { ctx } = this

    ctx.status = 400
    ctx.body = {
      code: ctx.status,
      success: false,
      message: msg,
    }
  }

  public async upload() {
    const { ctx, config } = this

    const contentType = ctx.get('Content-Type')

    if (!contentType || !contentType.startsWith('multipart/form-data')) {
      this.error('Content-Type 应该为 multipart/form-data')
      return
    }

    const body = ctx.request.body
    const files = ctx.request.files

    if (!files || files.length < 1) {
      this.error('请添加上传文件')
      return
    }

    for (const file of files) {
      if (!file.field) {
        this.error('上传文件需要设置 field')
        return
      }
    }

    const rules = {
      folder: { type: 'string', required: false, default: '/', trim: true },
      provider: { type: 'string', required: false, default: Provider.ALIBABA },
      bucket: { type: 'string', required: false, default: config[Provider.ALIBABA].bucket },
    }

    await ctx.validate(rules, body)

    if (body.provider !== Provider.ALIBABA) {
      this.error('不支持的 provider')
      return
    }

    const bucket = body.bucket
    const bucketWhitelist = config[Provider.ALIBABA].bucketWhitelist

    if (!bucketWhitelist.includes(bucket)) {
      this.error(`错误的 bucket, 请使用以下的 bucket: ${bucketWhitelist.toString()}`)
      return
    }

    ctx.body = await ctx.service.oss.upload(body, files)
  }
}
