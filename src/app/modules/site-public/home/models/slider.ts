export class Slider {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public title: string;
  public image: string;
  public description: string;
  public backgroundColor: string;
  public active: string;
}
