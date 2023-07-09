//import {RouteProp} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {ColorValue, Platform} from 'react-native';
import {dateDashToSlash, formatSSN} from '../../../utils/FunctionUtils';
import {
  evaluateValidationRule,
  validateEmail,
} from '../../../utils/ValidationUtils';
import {dateRegex, maskPhone, maskSSN, statesList} from '../constants';

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
export interface IInput {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string, unmasked?: string) => void;
  actionElement: 'input' | 'read-only' | 'datePicker' | 'selector';
  textContentType?: string | null;
  scrollPosition: number;
  required: boolean;
  minLength?: number | null;
  maxLength?: number | null;
  isError?: boolean;
  errorMessage?: string;
  onBlur?: () => void;
  textColor?: string;
  bgColor?: ColorValue;
  keyboardType?: 'numeric' | 'email-address';
  mask?: (string | RegExp)[];
  data?: any;
  ref?: React.RefObject<HTMLDivElement>;
}

//type IRegister2InfoRoute = RouteProp<any, 'Register2Account'>;

function useInputsContent(configuration: string[]) {
  const validationRules: any = {
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
  const [datePickerState, setDatePickerState] = useState<Boolean>(false);

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    token: 'asdf',
    firstName: '',
    lastName: '',
    streetAddress1: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    phoneType: 'Mobile',
    gender: '',
    email: '',
    dateOfBirth: '',
    ssn: '',
    middleInitial: '',
    streetAddress2: '',
  });
  const [isError, setIsError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    ssn: false,
    streetAddress1: false,
    city: false,
    state: false,
    zip: false,
    phone: false,
    gender: false,
    dateOfBirth: false,
  });

  const isButtonDisabled =
    !!validationRules.firstName.minLength &&
    validationRules.firstName.minLength <= userInfo.firstName?.length &&
    !!validationRules.lastName.minLength &&
    validationRules.lastName.minLength <= userInfo.lastName?.length &&
    validateEmail(
      userInfo?.email,
      validationRules.email.maxLength ?? undefined,
    ) &&
    !!validationRules.streetAddress1.minLength &&
    validationRules.streetAddress1.minLength <=
      userInfo.streetAddress1?.length &&
    !!validationRules.city.minLength &&
    validationRules.city.minLength <= userInfo.city?.length &&
    !!userInfo.state?.length &&
    userInfo.zip?.length >= 5 &&
    !!userInfo.phone?.length &&
    !!userInfo.phoneType?.length &&
    !!userInfo.gender?.length &&
    !!userInfo.dateOfBirth.match(dateRegex) &&
    !!formatSSN(userInfo.ssn)?.length &&
    !!validationRules.ssn.maxLength &&
    userInfo.ssn.length >= validationRules.ssn.maxLength - 2;

  let inputs: IInput[] = [
    {
      id: '1',
      label: 'First Name',
      placeholder: 'First Name',
      value: userInfo.firstName,
      onChangeText: (e: string) => {
        setUserInfo(prevUserInfo => {
          const newUserInfo = {...prevUserInfo, firstName: e};
          setIsError(prevIsError => ({
            ...prevIsError,
            firstName: !evaluateValidationRule(
              validationRules.firstName,
              newUserInfo.firstName,
            ),
          }));
          return newUserInfo;
        });
      },
      actionElement: 'input',
      textContentType: Platform.OS === 'ios' ? 'givenName' : null,
      scrollPosition: Platform.OS === 'ios' ? 0 : 20,
      required: validationRules.firstName.required,
      maxLength: validationRules.firstName.maxLength,
      isError: isError.firstName,
      errorMessage: 'not_valid_first_name',
      onBlur: () =>
        setIsError({
          ...isError,
          firstName: !evaluateValidationRule(
            validationRules.firstName,
            userInfo.firstName,
          ),
        }),
    },
    {
      id: '2',
      label: 'Middle Name',
      placeholder: 'Middle Name',
      value: userInfo.middleInitial,
      onChangeText: (e: string) => setUserInfo({...userInfo, middleInitial: e}),
      actionElement: 'input',
      textContentType: Platform.OS === 'ios' ? 'middleName' : null,
      scrollPosition: Platform.OS === 'ios' ? 0 : 90,
      required: validationRules.middleName.required,
      maxLength: validationRules.middleName.maxLength,
    },
    {
      id: '3',
      label: 'Last Name',
      placeholder: 'Last Name',
      value: userInfo.lastName,
      onChangeText: (e: string) => {
        setUserInfo(prevUserInfo => {
          const newUserInfo = {...prevUserInfo, lastName: e};
          setIsError(prevIsError => ({
            ...prevIsError,
            lastName: !evaluateValidationRule(
              validationRules.lastName,
              newUserInfo.lastName,
            ),
          }));
          return newUserInfo;
        });
      },
      actionElement: 'input',
      textContentType: Platform.OS === 'ios' ? 'familyName' : null,
      scrollPosition: Platform.OS === 'ios' ? 65 : 160,
      required: validationRules.lastName.required,
      maxLength: validationRules.lastName.maxLength,
      isError: isError.lastName,
      errorMessage: 'not_valid_last_name',
      onBlur: () =>
        setIsError({
          ...isError,
          lastName: !evaluateValidationRule(
            validationRules.lastName,
            userInfo.lastName,
          ),
        }),
    },
    {
      id: '4',
      label: 'Date of Birth',
      placeholder: 'Date of Birth',
      value: userInfo.dateOfBirth,
      onChangeText: () => {
        setDatePickerState(true);
      },
      actionElement: true ? 'read-only' : 'datePicker',
      textColor: 'primary',
      bgColor: '#D3D3D3',
      scrollPosition: Platform.OS === 'ios' ? 120 : 200,
      required: validationRules.dateOfBirth.required,
      isError: isError.dateOfBirth,
      errorMessage: 'not_valid_dob',
      onBlur: () =>
        userInfo.dateOfBirth.length > 4
          ? setIsError({...isError, dateOfBirth: true})
          : setIsError({...isError, dateOfBirth: true}),
    },
    {
      id: '5',
      label: 'Social Security Number',
      placeholder: 'Social Security Number',
      value: userInfo.ssn,
      onChangeText: (e: string) => {
        setUserInfo(prevUserInfo => {
          const newUserInfo = {...prevUserInfo, ssn: e};
          !!validationRules.ssn.maxLength &&
            newUserInfo.ssn.length === validationRules.ssn.maxLength &&
            setIsError(prevIsError => ({
              ...prevIsError,
              ssn:
                !!validationRules.ssn.maxLength &&
                newUserInfo.ssn.length < validationRules.ssn.maxLength,
            }));
          return newUserInfo;
        });
      },
      keyboardType: 'numeric',
      mask: maskSSN,
      actionElement: 'input',
      scrollPosition: Platform.OS === 'ios' ? 160 : 255,
      required: validationRules.ssn.required,
      minLength: validationRules.ssn.minLength,
      maxLength: validationRules.ssn.maxLength,
      isError: isError.ssn,
      errorMessage: 'Not Valid Social Security Number',
      onBlur: () =>
        !!validationRules.ssn.maxLength &&
        userInfo.ssn.length < validationRules.ssn.maxLength
          ? setIsError({...isError, ssn: true})
          : setIsError({...isError, ssn: false}),
    },
    {
      id: '6',
      label: 'Gender',
      placeholder: 'Gender',
      value: userInfo?.gender,
      onChangeText: (e: string) => setUserInfo({...userInfo, gender: e}),
      actionElement: 'selector',
      data: configuration ?? [],
      scrollPosition: Platform.OS === 'ios' ? 150 : 303,
      required: validationRules.gender.required,
      isError: isError.gender,
      errorMessage: 'Not Valid Gender',
      onBlur: () =>
        userInfo.gender
          ? setIsError({...isError, gender: false})
          : setIsError({...isError, gender: true}),
    },
    {
      id: '7',
      label: 'Email',
      placeholder: 'Email',
      value: userInfo.email,
      onChangeText: (e: string) => {
        setUserInfo(prevUserInfo => {
          const newUserInfo = {...prevUserInfo, email: e};
          validateEmail(newUserInfo.email) &&
            setIsError(prevIsError => ({
              ...prevIsError,
              email: !validateEmail(newUserInfo.email),
            }));
          return newUserInfo;
        });
      },
      keyboardType: 'email-address',
      actionElement: 'input',
      textContentType: Platform.OS === 'ios' ? 'emailAddress' : null,
      scrollPosition: Platform.OS === 'ios' ? 340 : 440,
      required: validationRules.email.required,
      maxLength: validationRules.email.maxLength,
      errorMessage: 'Not valid Email',
      isError: isError.email,
      onBlur: () =>
        setIsError({...isError, email: !validateEmail(userInfo.email)}),
    },
    {
      id: '8',
      label: 'Address 1',
      placeholder: 'Address 1',
      value: userInfo.streetAddress1,
      onChangeText: (e: string) => {
        setUserInfo(prevUserInfo => {
          const newUserInfo = {...prevUserInfo, streetAddress1: e};
          setIsError(prevIsError => ({
            ...prevIsError,
            streetAddress1: !evaluateValidationRule(
              validationRules.streetAddress1,
              newUserInfo.streetAddress1,
            ),
          }));
          return newUserInfo;
        });
      },
      actionElement: 'input',
      textContentType: Platform.OS === 'ios' ? 'streetAddressLine1' : null,
      scrollPosition: Platform.OS === 'ios' ? 410 : 510,
      required: validationRules.streetAddress1.required,
      maxLength: validationRules.streetAddress1.maxLength,
      errorMessage: 'not valid Address 1',
      isError: isError.streetAddress1,
      onBlur: () =>
        setIsError({
          ...isError,
          streetAddress1: !evaluateValidationRule(
            validationRules.streetAddress1,
            userInfo.streetAddress1,
          ),
        }),
    },
    {
      id: '9',
      label: 'Address 2',
      placeholder: 'Address 2',
      value: userInfo.streetAddress2,
      onChangeText: (e: string) =>
        setUserInfo({...userInfo, streetAddress2: e}),
      actionElement: 'input',
      textContentType: Platform.OS === 'ios' ? 'streetAddressLine2' : null,
      scrollPosition: Platform.OS === 'ios' ? 480 : 580,
      required: validationRules.streetAddress2.required,
      maxLength: validationRules.streetAddress2.maxLength,
    },
    {
      id: '10',
      label: 'City',
      placeholder: 'City',
      value: userInfo.city,
      onChangeText: (e: string) => {
        setUserInfo(prevUserInfo => {
          const newUserInfo = {...prevUserInfo, city: e};
          setIsError(prevIsError => ({
            ...prevIsError,
            city: !evaluateValidationRule(
              validationRules.city,
              newUserInfo.city,
            ),
          }));
          return newUserInfo;
        });
      },
      actionElement: 'input',
      textContentType: Platform.OS === 'ios' ? 'addressCity' : null,
      scrollPosition: Platform.OS === 'ios' ? 550 : 650,
      required: validationRules.city.required,
      maxLength: validationRules.city.maxLength,
      errorMessage: 'Not valid City',
      isError: isError.city,
      onBlur: () =>
        setIsError({
          ...isError,
          city: !evaluateValidationRule(validationRules.city, userInfo.city),
        }),
    },
    {
      id: '11',
      label: 'State',
      placeholder: 'State',
      value:
        statesList.find(list => list.value === userInfo?.state)?.label ?? '',
      onChangeText: (e: string) => setUserInfo({...userInfo, state: e}),
      actionElement: 'selector',
      textContentType: Platform.OS === 'ios' ? 'addressState' : null,
      data: statesList || [],
      scrollPosition: Platform.OS === 'ios' ? 500 : 750,
      required: validationRules.state.required,
      maxLength: validationRules.state.maxLength,
      errorMessage: 'Not valid State',
      isError: isError.state,
      onBlur: () =>
        userInfo.state
          ? setIsError({...isError, state: false})
          : setIsError({...isError, state: true}),
    },
    {
      id: '12',
      label: 'Zip Code',
      placeholder: 'Zip Code',
      value: userInfo.zip,
      onChangeText: (e: string) => {
        setUserInfo(prevUserInfo => {
          const newUserInfo = {...prevUserInfo, zip: e};
          setIsError(prevIsError => ({
            ...prevIsError,
            zip:
              !!validationRules.zip.maxLength &&
              newUserInfo.zip.length < validationRules.zip.maxLength,
          }));
          return newUserInfo;
        });
      },
      keyboardType: 'numeric',
      actionElement: 'input',
      textContentType: Platform.OS === 'ios' ? 'postalCode' : null,
      scrollPosition: Platform.OS === 'ios' ? 640 : 740,
      required: validationRules.zip.required,
      maxLength: validationRules.zip.maxLength,
      errorMessage: 'Not valid Zip Code',
      isError: isError.zip,
      onBlur: () =>
        setIsError({
          ...isError,
          zip:
            !!validationRules.zip.maxLength &&
            userInfo.zip.length < validationRules.zip.maxLength,
        }),
    },
    {
      id: '13',
      textColor: '#1f1f1f',
      label: 'Phone Number',
      placeholder: '###-###-####',
      value: userInfo.phone,
      onChangeText: () => {
        null;
      },
      bgColor: 'gray',
      keyboardType: 'numeric',
      mask: maskPhone,
      actionElement: 'read-only',
      scrollPosition: Platform.OS === 'ios' ? 900 : 740,
      required: validationRules.phone.required,
      maxLength: validationRules.phone.maxLength,
    },
  ];
  inputs = inputs.map(input => ({
    ref: useRef(),
    ...input,
  }));
  return {
    inputs,
    datePickerState,
    isButtonDisabled,
    userInfo,
    setUserInfo,
    setDatePickerState,
    setIsError,
  };
}

export default useInputsContent;
