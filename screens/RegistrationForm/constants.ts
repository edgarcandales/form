export interface stateProps {
  id: number;
  label: string;
  value: string;
  checked: boolean;
}

export const statesList: stateProps[] = [
  {
    id: 0,
    label: 'Alabama',
    value: 'AL',
    checked: false,
  },
  {
    id: 1,
    label: 'Alaska',
    value: 'AK',
    checked: false,
  },
  {
    id: 2,
    label: 'Arizona',
    value: 'AZ',
    checked: false,
  },
  {
    id: 3,
    label: 'Arkansas',
    value: 'AR',
    checked: false,
  },
  {
    id: 4,
    label: 'California',
    value: 'CA',
    checked: false,
  },
  {
    id: 5,
    label: 'Colorado',
    value: 'CO',
    checked: false,
  },
  {
    id: 6,
    label: 'Connecticut',
    value: 'CT',
    checked: false,
  },
  {
    id: 7,
    label: 'Delaware',
    value: 'DE',
    checked: false,
  },
  {
    id: 8,
    label: 'District Of Columbia',
    value: 'DC',
    checked: false,
  },
  {
    id: 9,
    label: 'Florida',
    value: 'FL',
    checked: false,
  },
  {
    id: 10,
    label: 'Georgia',
    value: 'GA',
    checked: false,
  },
  {
    id: 11,
    label: 'Hawaii',
    value: 'HI',
    checked: false,
  },
  {
    id: 12,
    label: 'Idaho',
    value: 'ID',
    checked: false,
  },
  {
    id: 13,
    label: 'Illinois',
    value: 'IL',
    checked: false,
  },
  {
    id: 14,
    label: 'Indiana',
    value: 'IN',
    checked: false,
  },
  {
    id: 15,
    label: 'Iowa',
    value: 'IA',
    checked: false,
  },
  {
    id: 16,
    label: 'Kansas',
    value: 'KS',
    checked: false,
  },
  {
    id: 17,
    label: 'Kentucky',
    value: 'KY',
    checked: false,
  },
  {
    id: 18,
    label: 'Louisiana',
    value: 'LA',
    checked: false,
  },
  {
    id: 19,
    label: 'Maine',
    value: 'ME',
    checked: false,
  },
  {
    id: 20,
    label: 'Maryland',
    value: 'MD',
    checked: false,
  },
  {
    id: 21,
    label: 'Massachusetts',
    value: 'MA',
    checked: false,
  },
  {
    id: 22,
    label: 'Michigan',
    value: 'MI',
    checked: false,
  },
  {
    id: 23,
    label: 'Minnesota',
    value: 'MN',
    checked: false,
  },
  {
    id: 24,
    label: 'Mississippi',
    value: 'MS',
    checked: false,
  },
  {
    id: 25,
    label: 'Missouri',
    value: 'MO',
    checked: false,
  },
  {
    id: 26,
    label: 'Montana',
    value: 'MT',
    checked: false,
  },
  {
    id: 27,
    label: 'Nebraska',
    value: 'NE',
    checked: false,
  },
  {
    id: 28,
    label: 'Nevada',
    value: 'NV',
    checked: false,
  },
  {
    id: 29,
    label: 'New Hampshire',
    value: 'NH',
    checked: false,
  },
  {
    id: 30,
    label: 'New Jersey',
    value: 'NJ',
    checked: false,
  },
  {
    id: 31,
    label: 'New Mexico',
    value: 'NM',
    checked: false,
  },
  {
    id: 32,
    label: 'New York',
    value: 'NY',
    checked: false,
  },
  {
    id: 33,
    label: 'North Carolina',
    value: 'NC',
    checked: false,
  },
  {
    id: 34,
    label: 'North Dakota',
    value: 'ND',
    checked: false,
  },
  {
    id: 35,
    label: 'Ohio',
    value: 'OH',
    checked: false,
  },
  {
    id: 36,
    label: 'Oklahoma',
    value: 'OK',
    checked: false,
  },
  {
    id: 37,
    label: 'Oregon',
    value: 'OR',
    checked: false,
  },
  {
    id: 38,
    label: 'Pennsylvania',
    value: 'PA',
    checked: false,
  },
  {
    id: 39,
    label: 'Rhode Island',
    value: 'RI',
    checked: false,
  },
  {
    id: 40,
    label: 'South Carolina',
    value: 'SC',
    checked: false,
  },
  {
    id: 41,
    label: 'South Dakota',
    value: 'SD',
    checked: false,
  },
  {
    id: 42,
    label: 'Tennessee',
    value: 'TN',
    checked: false,
  },
  {
    id: 43,
    label: 'Texas',
    value: 'TX',
    checked: false,
  },
  {
    id: 44,
    label: 'Utah',
    value: 'UT',
    checked: false,
  },
  {
    id: 45,
    label: 'Vermont',
    value: 'VT',
    checked: false,
  },
  {
    id: 46,
    label: 'Virginia',
    value: 'VA',
    checked: false,
  },
  {
    id: 47,
    label: 'Washington',
    value: 'WA',
    checked: false,
  },
  {
    id: 48,
    label: 'West Virginia',
    value: 'WV',
    checked: false,
  },
  {
    id: 49,
    label: 'Wisconsin',
    value: 'WI',
    checked: false,
  },
  {
    id: 50,
    label: 'Wyoming',
    value: 'WY',
    checked: false,
  },
];

export const maskDateOfBirth = [
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
export const maskSSN = [
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
export const maskPhone = [
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
export const dateRegex =
  /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/[0-9]{4}$/;

export const maskActivationCode = [
  /[A-Za-z0-9]/,
  /[A-Za-z0-9]/,
  /[A-Za-z0-9]/,
  /[A-Za-z0-9]/,
  /[A-Za-z0-9]/,
  '-',
  /[A-Za-z0-9]/,
  /[A-Za-z0-9]/,
  /[A-Za-z0-9]/,
  /[A-Za-z0-9]/,
  /[A-Za-z0-9]/,
  '-',
  /[A-Za-z0-9]/,
  /[A-Za-z0-9]/,
  /[A-Za-z0-9]/,
  /[A-Za-z0-9]/,
  /[A-Za-z0-9]/,
];

export const maskZip = [/\d/, /\d/, /\d/, /\d/, /\d/];

export const last4maskSSN = [/\d/, /\d/, /\d/, /\d/];

export const validationRules = {
  firstName: {
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  middleName: {
    required: false,
    minLength: 0,
    maxLength: 100,
  },
  lastName: {
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  dateOfBirth: {
    required: true,
    minLength: null,
    maxLength: null,
  },
  ssn: {
    required: true,
    minLength: null,
    maxLength: 11,
  },
  gender: {
    required: true,
    minLength: null,
    maxLength: null,
  },
  email: {
    required: true,
    minLength: null,
    maxLength: 80,
  },
  streetAddress1: {
    required: true,
    minLength: 1,
    maxLength: 49,
  },
  streetAddress2: {
    required: false,
    minLength: 1,
    maxLength: 100,
  },
  city: {
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  state: {
    required: true,
    minLength: null,
    maxLength: null,
  },
  zip: {
    required: true,
    minLength: null,
    maxLength: 5,
  },
  phone: {
    required: true,
    minLength: null,
    maxLength: null,
  },
  userName: {
    required: true,
    minLength: 5,
    maxLength: 60,
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 20,
  },
};
