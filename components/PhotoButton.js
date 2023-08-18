import React from 'react';
import {TouchableOpacity, View} from 'react-native';

const PhotoButton = ({handlePhoto}) => {
  return (
    <TouchableOpacity
      onPress={handlePhoto}
      style={{
        alignSelf: 'center',
        margin: 20,
      }}>
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#d0d5db',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PhotoButton;
