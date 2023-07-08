import React from 'react';
import Open from '../../assets/images/app_down_arrow.svg';
import {CardLink} from '../../components/CardLink';
import {CustomText} from '../../components/CustomText';
import {CustomTextInput} from '../../components/CustomTextInput';
import {CustomView} from '../../components/CustomView';

const RegistrationForm = () => {
  return (
    <CustomView>
      <CustomText>Test</CustomText>
      <CardLink>
        <CustomText>Test2</CustomText>
      </CardLink>

      <CustomTextInput
        label={'asdf'}
        placeholder={'asdf'}
        value={'fdf'}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={() => {}}
        clearButton={true}
        //onFocus={() => {
        //  setShowToggleButtonGroup(false);
        //  ref.current?.scrollTo({
        //    x: 0,
        //    y: Platform.OS === 'ios' ? 180 : 150,
        //  });
        //}}
        //onBlur={() => {
        //  setShowToggleButtonGroup(true);
        //  ref.current?.scrollTo({x: 0, y: 0});
        //}}
      />
    </CustomView>
  );
};

export default RegistrationForm;
