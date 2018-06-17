export interface IMedia {
  title: string;
  src: string;
  type: string;
}

export class MediaItem {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
  id: number;
  shortDesc: string;
  description: string;
  title: string;
  backgroundColor: string;
  displayOrder: string;
  published: string;
  seoFilename: string;
  mediaType: string;
  width: number;
  height: number;
  fileExtension: string;
  size: number;
  path: string;
  thumbPath: string;
}
