export class NewsMedia {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
  id: number;
  newsItemId: number;
  path: string;
  isFeatured: string;
  shortDesc: string;
  description: string;
  title: string;
  displayOrder: string;
  published: string;
  newsItem: string;
  size: number;
  fileExtension: string;
}
