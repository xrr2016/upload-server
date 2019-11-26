import * as fs from 'fs'
import { Service } from 'egg'
import * as OSS from 'ali-oss'

import { Provider, UploadParams } from '../params'

/**
 * Test Service
 */
export default class Oss extends Service {
  private client

  private createClient(option, config) {
    if (option.provider === Provider.ALIBABA) {
      this.client = new OSS({
        bucket: option.bucket,
        region: config[Provider.ALIBABA].region,
        accessKeyId: config[Provider.ALIBABA].accessKeyId,
        accessKeySecret: config[Provider.ALIBABA].accessKeySecret,
      })
    }
  }

  private deleteFile(filepath: string) {
    fs.unlink(filepath, () => true)
  }

  private async uploadFile(folder, file) {
    let result

    const filename = file.filename.replace(/\.(\w+)$/, `-${Date.now()}.$1`)

    try {
      result = await this.client.put(`${folder}/${filename}`, file.filepath, {
        headers: { 'Cache-Control': 'max-age=3600', 'Content-Disposition': '' },
      }).then(result => result)
    } catch (e) {
      this.ctx.logger.error(new Error(e.messag))
      throw new Error(e.message)
    } finally {
      this.deleteFile(file.filepath)
    }

    return result
  }

  public async upload(parmas: UploadParams, files) {
    const { config } = this
    this.createClient(parmas, config)

    let result

    if (files.length > 1) {
      result = []

      for (const file of files) {
        const res = await this.uploadFile(parmas.folder, file)

        result.push({
          success: true,
          // @ts-ignore
          url: res.url,
          // @ts-ignore
          name: res.name.replace(`${parmas.folder}/`, ''),
        })
      }

    } else {
      const file = files[0]
      const res = await this.uploadFile(parmas.folder, file)

      result = {
        url: res.url,
        success: true,
        name: res.name.replace(`${parmas.folder}/`, ''),
      }
    }

    return result

  }
}
