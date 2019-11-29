import { app, assert } from 'egg-mock/bootstrap'

describe('测试 oss controller', () => {
  it('请求头数据类型不是 form-data 返回错误', async () => {
    return app.httpRequest()
      .post('/upload-server/v1/oss')
      .expect(400)
  })

  it('请求需要有上传文件, 否则返回错误', async () => {
    return app.httpRequest()
      .post('/upload-server/v1/oss')
      .set('Content-type', 'multipart/form-data; boundary=--------------------------820317025826519383208825')
      .expect(400)
  })

  // it('上传文件需要设置 field', async () => {
  //   return app.httpRequest()
  //     .post('/upload-server/v1/oss')
  //     .set('Content-type', 'multipart/form-data; boundary=--------------------------820317025826519383208825')
  //     .attach('', 'test/app/controller/avatar.png')
  //     .expect(400)
  // })

  it('不再白名单的 bucket 名返回错误', async () => {
    const result = await app.httpRequest()
      .post('/upload-server/v1/oss')
      .set('Content-type', 'multipart/form-data; boundary=--------------------------820317025826519383208825')
      .field('bucket', 'wrong-bucket')
      .expect(400)

    assert(result.body)
  })

  it('上传文件成功', async () => {
    const result = await app.httpRequest()
      .post('/upload-server/v1/oss')
      .set('Content-type', 'multipart/form-data; boundary=--------------------------820317025826519383208825')
      .field('folder', 'images')
      .attach('avatar', 'test/app/controller/avatar.png')
      .expect(200)

    assert(result.body)
  })

})
