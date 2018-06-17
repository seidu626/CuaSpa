export class ContactDataSettings {

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  companyTelephoneNumber: string;

  hotlineTelephoneNumber: string;

  mobileTelephoneNumber: string;

  companyFaxNumber: string;

  companyEmailAddress: string;

  webmasterEmailAddress: string;

  supportEmailAddress: string;

  contactEmailAddress: string;
}
