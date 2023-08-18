import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 3000);
  }, []);

  const backgroundImageUrl =
    'https://images.squarespace-cdn.com/content/v1/5835df5c03596ef406d04ce4/1615954127436-VA1UKK3QW3GXC8KPN78G/nick-fewings-C2zhShTnl5I-unsplash.jpg?format=2500w';

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: backgroundImageUrl,
        }}
        style={styles.image}
      />
      <Text style={styles.text}>Pictures everywhere</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
  },
  text: {
    position: 'absolute',
    color: 'white',
    fontSize: 30,
  },
});

export default SplashScreen;
