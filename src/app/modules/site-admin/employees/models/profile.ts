export class Profile {

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public id: number;
  public employeeId: number;
  public employee: string;
  public shortDescription: string;
  public description: string;
  public email: string;
  public facebook: string;
  public twitter: string;
  public linkedIn: string;
  public memberTypeId: number;
  public memberType: string;
  public picturePath: string;
}
