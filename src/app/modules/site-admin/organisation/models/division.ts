export class Division { 
  constructor(values: Object = {}) {
    Object.assign(this, values);   
  }
  
  public id: number;
  public code: string;
  public name: string;
  public description: string;
}
