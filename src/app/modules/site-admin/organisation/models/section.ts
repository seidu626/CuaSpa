export class Section { 
  constructor(values: Object = {}) {
    Object.assign(this, values);   
  }
  
  public id: number;
  public departmentId: number;
  public departmentCode: string;
  public code: string;
  public name: string;
  public description: string;
  public department: string;
}
