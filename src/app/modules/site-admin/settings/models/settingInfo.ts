export class SettingInfo {  
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
  id: number;
  tenantId: number;
  userId: number;
  name: string;
  value: string;
  description: string;
}
