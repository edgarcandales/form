import {useState} from 'react';
import useConfig from '../../../hooks/useConfig';
import {AHS} from '../../../services/AHS';
import {
  dateSlashToDash,
  formatSSN,
  registerErrorAlert,
} from '../../../util/FunctionUtils';
import {useTranslation} from 'react-i18next';

const useOnHandleContinue = (userInfo: any, navigation: any) => {
  const config = useConfig();
  const [outOfAreaModal, setOutOfAreaModal] = useState<boolean>(false);
  const [minAgeModal, setMinAgeModal] = useState<boolean>(false);
  const [showActivity, setShowActivity] = useState<boolean>(false);
  const [onLoading, setOnLoading] = useState<boolean>(false);
  const {t} = useTranslation();
  let address = {
    line1: userInfo.streetAddress1,
    city: userInfo.city,
    state: userInfo.state,
    zip: userInfo.zip,
  };
  const onHandleContinue = () => {
    //if (userInfo.ssn.length < validationRules.ssn.maxLength - 2) {
    //  scrollViewRef.current.scrollTo({
    //    y: inputs[4].scrollPosition,
    //    animated: true,
    //  });
    //  inputs[4]?.ref?.current?.focus();
    //  setIsError(true);
    //  console.log(inputs[4]?.ref?.current, 'inputs[4]?.ref?.current?');
    //} else {
    setShowActivity(true);
    setOnLoading(true);
    AHS.verify(
      userInfo.token,
      userInfo.firstName,
      userInfo.middleInitial,
      userInfo.lastName,
      dateSlashToDash(userInfo.dateOfBirth),
      formatSSN(userInfo.ssn),
      userInfo.email,
      address,
      userInfo.gender,
    )
      .then(res => {
        AHS.getOrCreatePatient(res.token)
          .then(response => {
            setOnLoading(false);
            setShowActivity(false);
            navigation.navigate(
              config.getStringSetting('amenity.registration.navigation', ''),
              {
                token: response.token,
                email: userInfo.email,
              },
            );
          })
          .catch(err => {
            setOnLoading(false);
            setShowActivity(false);
            if (
              (err.response?.status >= 500 && err.response?.status <= 599) ||
              err.response?.status === 408 ||
              err.response?.code === 'ERR_NETWORK'
            ) {
              registerErrorAlert(
                t('app_alert_connection_title'),
                t('app_alert_connection_text'),
                () => {},
              );
            } else if (
              err?.response?.data?.errorType === 'existing-portal-account'
            ) {
              navigation.navigate('DuplicateAccount', {
                ...err.response.data,
              });
            } else if (err?.response?.data?.errorType === 'zip-out-of-area') {
              setOutOfAreaModal(true);
            } else if (err?.response?.data?.errorType === 'unspecified') {
              navigation.navigate('AccountFailed', {
                info: null,
              });
            } else {
              navigation.navigate('AccountFailed', {
                info: null,
              });
            }
          });
      })
      .catch(err => {
        setShowActivity(false);
        setOnLoading(false);
        if (
          (err.status > 500 && err.status <= 599) ||
          err.status === 408 ||
          err.code === 'ERR_NETWORK'
        ) {
          registerErrorAlert(
            t('app_alert_connection_title'),
            t('app_alert_connection_text'),
            () => {},
          );
        } else if (
          err?.response?.data?.response?.errorType === 'under-min-age'
        ) {
          setMinAgeModal(true);
        } else if (
          err?.response?.data?.response?.errorType === 'id-verification-failed'
        ) {
          navigation.navigate('AccountFailed', {
            info: null,
          });
        } else if (err?.response?.data?.response?.errorType === 'low-trust') {
          navigation.navigate('AccountFailed', {
            info: null,
          });
        } else {
          navigation.navigate('AccountFailed', {
            info: null,
          });
        }
      });
    //}
  };

  return {
    onHandleContinue,
    onLoading,
    outOfAreaModal,
    minAgeModal,
    setOutOfAreaModal,
    setMinAgeModal,
    showActivity,
  };
};

export default useOnHandleContinue;
