// import * as fs from 'fs'
import { Service } from 'egg'
import * as OSS from 'ali-oss'
import * as path from 'path'
import * as sendToWormhole from 'stream-wormhole'

import { Provider, UploadParams } from '../params'

/**
 * Test Service
 */
export default class Oss extends Service {
  private client

  private createClient(option) {
    const { config } = this

    if (option.provider === Provider.ALIBABA) {
      this.client = new OSS({
        secure: true,
        bucket: option.bucket,
        region: config[Provider.ALIBABA].region,
        accessKeyId: config[Provider.ALIBABA].accessKeyId,
        accessKeySecret: config[Provider.ALIBABA].accessKeySecret,
      })
    }
  }

  public async upload(parmas: UploadParams, stream) {
    this.createClient(parmas)

    let result

    try {
      result = await this.client.put(`${parmas.folder}/${path.basename(stream.filename)}`, stream, {
        headers: { 'Cache-Control': 'max-age=3600', 'Content-Disposition': '' },
      })
    } catch (e) {
      this.ctx.logger.error(new Error(e.messag))
      throw new Error(e.message)
    } finally {
      await sendToWormhole(stream)
    }

    return {
      name: result.name,
      url: result.url,
    }
  }
}
