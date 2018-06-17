export class CompanyInformationSettings {

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }


  companyName: string;

  address: string;

  salutation: string;

  title: string;

  about: string;

  mission: string;

  vision: string;

  street: string;

  street2: string;

  zipCode: string;

  city: string;

  countryId: number;

  region: string;

  countryName: string;

  stateName: string;
}
