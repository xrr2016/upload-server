// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportLogger from '../../../app/middleware/logger';
import ExportPayload from '../../../app/middleware/payload';
import ExportRatelimit from '../../../app/middleware/ratelimit';

declare module 'egg' {
  interface IMiddleware {
    logger: typeof ExportLogger;
    payload: typeof ExportPayload;
    ratelimit: typeof ExportRatelimit;
  }
}
