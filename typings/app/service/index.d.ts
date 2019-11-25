// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOss from '../../../app/service/oss';

declare module 'egg' {
  interface IService {
    oss: ExportOss;
  }
}
