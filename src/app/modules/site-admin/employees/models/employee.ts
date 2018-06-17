export class Employee {

  public fullname = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
    this.fullname = `${this.surname} ${this.othernames} ${this.firstname}`;
  }

  public id: number;
  public sectionCode: string;
  public section: string;
  public username: string;
  public levelCode: string;
  public level: string;
  public departmentCode: string;
  public department: string;
  public divisionCode: string;
  public division: string;
  public categoryCode: string;
  public category: string;
  public jobRoleCode: string;
  public jobRole: string;
  public surname: string;
  public firstname: string;
  public othernames: string;
  public phone: string;
  public email: string;
  public sex: string;
  public physicalAddress: string;
  public postalAddress: string;
  public picturePath: string;
  public avatar: string;
}
