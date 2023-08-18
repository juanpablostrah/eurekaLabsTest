import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ButtonBack from './components/ButtonBack';
import MainScreen from './screens/MainScreen';
import PictureScreen from './screens/PictureScreen';
import SplashScreen from './screens/SplashScreen';
import TakePictureScreen from './screens/TakePictureScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{title: 'Picture Everywhere'}}
        />
        <Stack.Screen
          name="TakePicture"
          component={TakePictureScreen}
          options={({navigation}) => ({
            headerTitle: '',
            headerLeft: () => <ButtonBack navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Picture"
          component={PictureScreen}
          options={({navigation}) => ({
            headerTitle: '',
            headerLeft: () => (
              <ButtonBack navigation={navigation} lastStep={true} />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
