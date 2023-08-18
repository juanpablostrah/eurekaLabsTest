import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import backArrow from '../assets/backArrow.jpg';

const ButtonBack = ({navigation, lastStep}) => {
  const goBack = () => {
    return lastStep ? navigation.navigate('Main') : navigation.goBack();
  };
  return (
    <TouchableOpacity onPress={goBack}>
      <Image
        source={backArrow}
        style={{width: 30, height: 30, resizeMode: 'contain'}}
      />
    </TouchableOpacity>
  );
};

export default ButtonBack;
