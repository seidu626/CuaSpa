export class NewsComment {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
  id: number;
  employeeId: string;
  ipAddress: string;
  isApproved: string;
  employee: string;
  commentTitle: string;
  commentText: string;
  newsItemId: string;
  newsItem: string;
  createdDate: string;
}
