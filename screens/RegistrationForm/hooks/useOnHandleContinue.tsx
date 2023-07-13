import {useState} from 'react';
import {registerErrorAlert} from '../../../utils/FunctionUtils';

const useOnHandleContinue = (userInfo: any) => {
  const [outOfAreaModal, setOutOfAreaModal] = useState<boolean>(false);
  const [minAgeModal, setMinAgeModal] = useState<boolean>(false);
  const [showActivity, setShowActivity] = useState<boolean>(false);
  const [onLoading, setOnLoading] = useState<boolean>(false);
  const onHandleContinue = () => {
    console.log('Handle Continue');
    registerErrorAlert('Press', 'Button has been pressed', () => {});
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
