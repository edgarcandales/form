import {
  TValidationObject,
  ValidationRules,
} from '../../../util/ValidationUtils';

// UserInfo for useInputsContent...
export interface IUserInfo {
  token: string;
  firstName: string;
  lastName: string;
  streetAddress1: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneType: 'Mobile';
  gender: string;
  email: string;
  dateOfBirth: string;
  ssn: string;
  middleInitial: string;
  streetAddress2: string;
}

// ValidationObject used in useInputsContent.tsx.
// Contains all the properties of IUserInfo + middleName.
export type ValidationObject = TValidationObject<IUserInfo> & {
  middleName: ValidationRules;
};

export function getDefaultValidationObject(): ValidationObject {
  return {
    token: {required: false, minLength: 0, maxLength: Number.MAX_VALUE},
    firstName: {required: false, minLength: 0, maxLength: Number.MAX_VALUE},
    lastName: {required: false, minLength: 0, maxLength: Number.MAX_VALUE},
    streetAddress1: {
      required: false,
      minLength: 0,
      maxLength: Number.MAX_VALUE,
    },
    city: {required: false, minLength: 0, maxLength: Number.MAX_VALUE},
    state: {required: false, minLength: 0, maxLength: Number.MAX_VALUE},
    zip: {required: false, minLength: 0, maxLength: Number.MAX_VALUE},
    phone: {required: false, minLength: 0, maxLength: Number.MAX_VALUE},
    phoneType: {required: false, minLength: 0, maxLength: Number.MAX_VALUE},
    gender: {required: false, minLength: 0, maxLength: Number.MAX_VALUE},
    email: {required: false, minLength: 0, maxLength: Number.MAX_VALUE},
    dateOfBirth: {required: false, minLength: 0, maxLength: Number.MAX_VALUE},
    ssn: {required: false, minLength: 0, maxLength: Number.MAX_VALUE},
    middleInitial: {required: false, minLength: 0, maxLength: Number.MAX_VALUE},
    streetAddress2: {
      required: false,
      minLength: 0,
      maxLength: Number.MAX_VALUE,
    },
    middleName: {required: false, minLength: 0, maxLength: Number.MAX_VALUE},
  };
}

export interface bannerFeaturesObject {
  text: string;
  url: string;
  visible: boolean;
}
