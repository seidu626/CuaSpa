export class Department {
  public id: number;
  public code: string;
  public name: string;
  public description: string;
  public divisionId: number;
  public divisionCode: string;
  public division: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
