import { app } from 'egg-mock/bootstrap'

describe('测试 oss controller', () => {
  it('请求数据类型不是 form-data 返回错误', async () => {
    return app.httpRequest()
      .post('/upload-server/v1/oss')
      .expect(500)
  })

  it('请求需要带上文件, 否则返回错误', async () => {
    return app.httpRequest()
      .post('/upload-server/v1/oss')
      .type('form')
      .expect(500)
  })

})
