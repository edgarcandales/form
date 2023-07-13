import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import useConfig from '../../../hooks/useConfig';
import {AHS} from '../../../services/AHS';
import {
  dateSlashToDash,
  formatSSN,
  registerErrorAlert,
} from '../../../util/FunctionUtils';

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
    console.log('Handle Continue');
    registerErrorAlert('Press', 'Button has been pressed');
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
