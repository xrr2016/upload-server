import * as fs from 'fs'
import { Service } from 'egg'
import * as OSS from 'ali-oss'

import { Provider } from '../params'

/**
 * Oss Service
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

  private async uploadFile(folder, file) {
    let result

    const filename = file.filename.replace(/\.(\w+)$/, `-${Date.now()}.$1`)

    try {
      result = await this.client.put(`${folder}/${filename}`, file.filepath, {
        headers: { 'Cache-Control': 'max-age=3600', 'Content-Disposition': '' },
      })
    } catch (e) {
      this.ctx.logger.error(new Error(e.messag))
      throw new Error(e.message)
    } finally {
      fs.unlink(file.filepath, () => true)
    }

    return result
  }

  public async upload(parmas, files) {
    this.createClient(parmas)

    let result

    if (files.length > 1) {
      result = []

      for (const file of files) {
        const res = await this.uploadFile(parmas.folder, file)

        result.push({
          url: res.url,
          name: res.name.replace(`${parmas.folder}/`, ''),
        })
      }

    } else {
      const file = files[0]
      const res = await this.uploadFile(parmas.folder, file)

      result = {
        url: res.url,
        name: res.name.replace(`${parmas.folder}/`, ''),
      }
    }

    return result
  }

}
