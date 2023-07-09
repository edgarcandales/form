import {useState} from 'react';
import {stateProps} from '../constants';

const useRegister2State = (
  availableGenders: string,
  statesList: stateProps[],
) => {
  const configuration = availableGenders
    .split(',')
    .map((str: string, index: number) => ({
      id: String(index + 1),
      label: str,
      value: str,
    }));

  const [statesConfig, setStatesConfig] = useState(statesList);

  return {
    configuration,
    statesConfig,
    setStatesConfig,
  };
};

export default useRegister2State;
