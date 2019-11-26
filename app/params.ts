export enum Provider {
  ALIBABA = 'ALIBABA',
}

export interface UploadParams {
  folder: string;
  bucket: string;
  provider: Provider
}
