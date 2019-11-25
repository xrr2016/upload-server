// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOss from '../../../app/controller/oss';

declare module 'egg' {
  interface IController {
    oss: ExportOss;
  }
}
