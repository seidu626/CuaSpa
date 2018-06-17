export class NewsItem {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
  id: number;
  author: string;
  title: string;
  quote: string;
  short: string;
  full: string;
  published: string;
  startDateUtc: string;
  endDateUtc: string;
  allowComments: string;
  approvedCommentCount: number;
  notApprovedCommentCount: number;
  metaKeywords: string;
  metaDescription: string;
  metaTitle: string;
  publishedDate: string;
  path: string;
  thumbPath: string;
}
