export class SocialSettings {

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  showSocialLinksInFooter: boolean;
  facebookLink: string;
  googlePlusLink: string;
  twitterLink: string;
  pinterestLink: string;
  linkedInLink: string;
}
