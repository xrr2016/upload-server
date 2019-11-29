import * as body from 'deepexi-body'

export default () => {
  return async function payload(ctx, next) {
    await next()

    if (
      ctx.status >= 200 &&
      ctx.status < 300
    ) {
      ctx.body = body.success(ctx.body || '', '操作成功')
    }
  }
};
