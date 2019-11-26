import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.post(`/${app.name}/v1/oss`, controller.oss.upload)
};
