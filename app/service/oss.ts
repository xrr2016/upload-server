import { Service } from 'egg'
import * as fs from 'fs'
import * as OSS from 'ali-oss'

import { Provider, UploadParams } from '../params'

/**
 * Test Service
 */
export default class Oss extends Service {
  private client

  private createClient(option, config) {
    if (option.provider === Provider.ALIOSS) {
      this.client = new OSS({
        bucket: option.bucket,
        region: config[Provider.ALIOSS].region,
        accessKeyId: config[Provider.ALIOSS].accessKeyId,
        accessKeySecret: config[Provider.ALIOSS].accessKeySecret,
      })
    }
  }

  private deleteFile(filepath: string) {
    fs.unlink(filepath, () => {
    })
  }

  private async uploadFile(folder, file) {
    let result

    try {
      result = await this.client.put(`${folder}/${file.filename}`, file.filepath, {
        headers: { 'Cache-Control': 'max-age=3600', 'Content-Disposition': '' },
      }).then(result => result)
    } finally {
      this.deleteFile(file.filepath)
    }

    return result
  }

  // public async buckets() {
  // }

  public async upload(parmas: UploadParams, files) {
    const { config } = this
    this.createClient(parmas, config)

    if (files.length > 1) {
      const results = []

      for (const file of files) {
        const result = await this.uploadFile(parmas.folder, file)

        results.push({
          // @ts-ignore
          url: result.url,
          // @ts-ignore
          name: file.filename,
        })
      }

      return results
    } else {
      const file = files[0]
      const result = await this.uploadFile(parmas.folder, file)

      return {
        url: result.url,
        name: file.filename,
      }
    }

  }
}
