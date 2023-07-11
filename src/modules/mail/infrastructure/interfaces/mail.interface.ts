export interface IMessageMQ {
  pattern: { cmd: string },
  data: string,
  id: string
}

export interface IDataMQ {
  emailData: IEmailData,
  fileDataIds: string[],
}


export interface IEmailData {
  from: string,
  to: string,
  subject: string,
  html: string
}

export interface IAttachment {
  filename: string;
  content?: any;
  path?: string;
  contentType?: string;
  cid?: string;
  encoding?: string;
  contentDisposition?: 'attachment' | 'inline' | undefined;
  href?: string;
}

export interface IFileData{
  fileName: string,
  filePath: string,
  mimeType: string,
  moduleUuId: string|null,
  fileSystem: string,
  isTemporal: boolean,
  createdAt: string,
  expiredAt: string,
  uuidName: string,
  _id: string,
}