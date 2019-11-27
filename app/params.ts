export enum Provider {
  ALIBABA = 'alibaba',
}

export interface UploadParams {
  folder: string;
  bucket: string;
  provider: Provider
}
