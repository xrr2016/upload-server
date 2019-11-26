import { Controller } from 'egg'
import { Provider } from '../params'

export default class OssController extends Controller {
  public async upload() {
    const { ctx, config } = this

    const rules = {
      folder: { type: 'string', required: false, default: '/', trim: true },
      provider: { type: 'string', required: false, default: Provider.ALIBABA },
      bucket: { type: 'string', required: false, default: config[Provider.ALIBABA].bucket },
    }

    await ctx.validate(rules, ctx.request.body)

    ctx.body = await ctx.service.oss.upload(ctx.request.body, ctx.request.files)
  }
}
