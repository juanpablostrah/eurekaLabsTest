import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {Share} from 'react-native';

import {API_KEY} from '../utils/const';

const PictureScreen = ({route}) => {
  const {newUri} = route.params;
  const [city, setCity] = useState('');

  // Get the current location when the component mount
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        fetchCity(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.log('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const fetchCity = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
      );
      const results = response.data.results;
      if (results.length > 0) {
        const cityComponent = results.find(result =>
          result.types.includes('locality'),
        );
        if (cityComponent) {
          setCity(cityComponent.formatted_address);
        }
      }
    } catch (error) {
      console.log('Error fetching city:', error);
    }
  };

  const handleSharePress = () => {
    shareImage(newUri);
  };

  const shareImage = async imageUri => {
    try {
      await Share.share({
        title: 'Share Image',
        url: imageUri,
      });
    } catch (error) {
      console.error('Error sharing image:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: newUri}} />
      <View style={styles.direccionText}>
        <Text style={styles.labelText}>Picture Location: </Text>
        <Text style={styles.cityText}>{city}</Text>
      </View>
      <TouchableOpacity style={styles.shareButton} onPress={handleSharePress}>
        <Text style={styles.textButton}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  labelText: {
    fontStyle: 'italic',
    fontWeight: '500',
    color: '#3285a8',
  },
  direccionText: {
    flexDirection: 'row',
  },
  image: {
    marginTop: 20,
    marginBottom: 50,
    width: 300,
    height: 300,
  },
  shareButton: {
    width: '50%',
    borderRadius: 10,
    marginTop: 40,
    backgroundColor: 'blue',
    padding: 10,
    display: 'flex',
    alignSelf: 'center',
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
  },
});

export default PictureScreen;
