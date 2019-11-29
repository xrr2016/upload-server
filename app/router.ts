import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.post(`/${app.name}/v1/upload`, controller.oss.upload)
};
