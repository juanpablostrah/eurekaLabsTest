import {useState} from 'react';
import React, {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

const MainScreen = ({navigation}) => {
  const dogPhoto =
    'https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2022/04/19/16503782679936.jpg';
  //mockup of previus photos taked it
  const [uris, setUris] = useState([dogPhoto, dogPhoto, dogPhoto]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.photosGallery}>
        {uris?.map((uri, index) => (
          <Image
            key={index}
            style={{width: 100, height: 100, margin: 10}}
            source={{uri: uri}}
          />
        ))}
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 40}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TakePicture', {setUris, uris})}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Take Picture
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '50%',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    display: 'flex',
    alignSelf: 'center',
  },
  photosGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default MainScreen;
