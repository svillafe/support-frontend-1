// @flow

// ----- Imports ----- //

import type { Campaign } from 'helpers/tracking/acquisitions';
import type { ReferrerAcquisitionData } from 'helpers/tracking/acquisitions';
import {
  countryGroups,
  type CountryGroupId,
} from 'helpers/internationalisation/countryGroup';

import { getPromoCode, getIntcmp } from './flashSale';
import type { SubscriptionProduct } from './subscriptions';


// ----- Types ----- //

export type MemProduct = 'patrons' | 'events';

type PromoCodes = {
  [SubscriptionProduct]: string,
};

export type SubsUrls = {
  [SubscriptionProduct]: string,
};


// ----- Setup ----- //

const subsUrl = 'https://subscribe.theguardian.com';
const defaultIntCmp = 'gdnwb_copts_bundles_landing_default';
const iOSAppUrl = 'https://itunes.apple.com/app/the-guardian/id409128287?mt=8';
const androidAppUrl = 'https://theguardian.app.link/dPnRUMLd1P';
const dailyEditionUrl = 'https://itunes.apple.com/app/guardian-observer-daily-edition/id452707806?mt=8';

const memUrls: {
  [MemProduct]: string,
} = {
  patrons: 'https://membership.theguardian.com/patrons',
  events: 'https://membership.theguardian.com/events',
};

const defaultPromos: PromoCodes = {
  DigitalPack: getPromoCode('DigitalPack', 'DXX83X'),
  Paper: getPromoCode('Paper', 'GXX83P'),
  PaperAndDigital: getPromoCode('PaperAndDigital', 'GXX83X'),
};

const customPromos : {
  [Campaign]: PromoCodes,
} = {
  seven_fifty_middle: {
    DigitalPack: 'D750MIDDLE',
    Paper: 'N750MIDDLE',
    PaperAndDigital: 'ND750MIDDLE',
  },
  seven_fifty_end: {
    DigitalPack: 'D750END',
    Paper: 'N750END',
    PaperAndDigital: 'ND750END',
  },
  seven_fifty_email: {
    DigitalPack: 'D750EMAIL',
    Paper: 'N750EMAIL',
    PaperAndDigital: 'ND750EMAIL',
  },
  epic_paradise_paradise_highlight: {
    DigitalPack: 'DPARAHIGH',
    Paper: 'NPARAHIGH',
    PaperAndDigital: 'NDPARAHIGH',
  },
  epic_paradise_control: {
    DigitalPack: 'DPARACON',
    Paper: 'NPARACON',
    PaperAndDigital: 'NDPARACON',
  },
  epic_paradise_different_highlight: {
    DigitalPack: 'DPARADIFF',
    Paper: 'NPARADIFF',
    PaperAndDigital: 'NDPARADIFF',
  },
  epic_paradise_standfirst: {
    DigitalPack: 'DPARASTAND',
    Paper: 'NPARASTAND',
    PaperAndDigital: 'NDPARASTAND',
  },
  banner_just_one_control: {
    DigitalPack: 'DBANJUSTCON',
    Paper: 'NBANJUSTCON',
    PaperAndDigital: 'NDBANJUSTCON',
  },
  banner_just_one_just_one: {
    DigitalPack: 'DBANJUSTONE',
    Paper: 'NBANJUSTONE',
    PaperAndDigital: 'NDBANJUSTONE',
  },
};


// ----- Functions ----- //

// Creates URLs for the membership site from promo codes and intCmp.
function getMemLink(product: MemProduct, intCmp: ?string): string {

  const params = new URLSearchParams();
  params.append('INTCMP', intCmp || defaultIntCmp);

  return `${memUrls[product]}?${params.toString()}`;

}

function buildParamString(
  product: SubscriptionProduct,
  intCmp: ?string,
  referrerAcquisitionData: ReferrerAcquisitionData,
): string {
  const params = new URLSearchParams(window.location.search);

  const maybeCustomIntcmp = getIntcmp(product, intCmp, defaultIntCmp);
  params.set('INTCMP', maybeCustomIntcmp);
  params.set('acquisitionData', JSON.stringify(referrerAcquisitionData));

  return params.toString();
}

// Creates URLs for the subs site from promo codes and intCmp.
function buildSubsUrls(
  countryGroupId: CountryGroupId,
  promoCodes: PromoCodes,
  intCmp: ?string,
  referrerAcquisitionData: ReferrerAcquisitionData,
): SubsUrls {

  const countryId = countryGroups[countryGroupId].supportInternationalisationId;

  const paper = `${subsUrl}/p/${promoCodes.Paper}?${buildParamString('Paper', intCmp, referrerAcquisitionData)}`;
  const paperDig = `${subsUrl}/p/${promoCodes.PaperAndDigital}?${buildParamString('PaperAndDigital', intCmp, referrerAcquisitionData)}`;
  const digital = `/${countryId}/subscribe/digital?${buildParamString('DigitalPack', intCmp, referrerAcquisitionData)}`;
  const weekly = `${subsUrl}/weekly?${buildParamString('GuardianWeekly', intCmp, referrerAcquisitionData)}`;

  return {
    DigitalPack: digital,
    Paper: paper,
    PaperAndDigital: paperDig,
    GuardianWeekly: weekly,
  };

}

// Creates links to subscriptions, tailored to the user's campaign.
function getSubsLinks(
  countryGroupId: CountryGroupId,
  intCmp: ?string,
  campaign: ?Campaign,
  referrerAcquisitionData: ReferrerAcquisitionData,
): SubsUrls {
  if ((campaign && customPromos[campaign])) {
    return buildSubsUrls(
      countryGroupId,
      customPromos[campaign],
      intCmp,
      referrerAcquisitionData,
    );
  }

  return buildSubsUrls(countryGroupId, defaultPromos, intCmp, referrerAcquisitionData);

}

// Builds a link to the digital pack checkout.
function getDigitalCheckout(
  referrerAcquisitionData: ReferrerAcquisitionData,
  cgId: CountryGroupId,
  referringCta: ?string,
): string {

  const params = new URLSearchParams(window.location.search);
  params.set('acquisitionData', JSON.stringify(referrerAcquisitionData));
  params.set('promoCode', defaultPromos.DigitalPack);
  params.set('countryGroup', countryGroups[cgId].supportInternationalisationId);
  params.set('startTrialButton', referringCta || '');

  return `${subsUrl}/checkout?${params.toString()}`;
}


// ----- Exports ----- //

export {
  getSubsLinks,
  getMemLink,
  getDigitalCheckout,
  iOSAppUrl,
  androidAppUrl,
  dailyEditionUrl,
};
