export enum Provider {
  ALIOSS = 'alibaba',
}

export interface UploadParams {
  folder: string;
  bucket: string;
  provider: Provider
}
