import {useState} from 'react';

const useRegister2State = (availableGenders: string, statesList: any[]) => {
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
