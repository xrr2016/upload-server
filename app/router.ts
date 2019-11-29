import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.post(`/${app.name}/v1/upload`, app.middleware.ratelimit(), controller.oss.upload)
};
