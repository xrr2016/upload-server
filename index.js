const Koa = require('koa')
const cors = require('@koa/cors')
const app = new Koa()
const axios = require('axios')
const utils = require('./utils')

app.use(cors())
app.listen(process.env.PORT || 3000)

app.use(async (ctx, next) => {
  if (ctx.path == '/upload') {
    ctx.body = 'ok'
  } else ctx.res.status = 404
})
