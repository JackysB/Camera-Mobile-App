import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/Main';
import Gallery from './components/Gallery'
import BigPhoto from './components/BigPhoto';
import PhotoCamera from './components/PhotoCamera';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          options={{ headerShown: false, }}
          component={Main}
        />
        <Stack.Screen
          name="Gallery"
          options={{
            title: "Zdjęcia z folderu DCIM",
            headerStyle: {
              backgroundColor: '#112D4E'
            },
            headerTintColor: '#F9F7F7',
          }}
          component={Gallery}
        />
        <Stack.Screen
          name="BigPhoto"
          options={{
            title: "Wybrane zdjęcie",
            headerStyle: {
              backgroundColor: '#112D4E'
            },
            headerTintColor: '#F9F7F7',
          }}
          component={BigPhoto}
        />
        <Stack.Screen
          name="PhotoCamera"
          options={{
            title: "Kamera",
            headerStyle: {
              backgroundColor: '#112D4E'
            },
            headerTintColor: '#F9F7F7',
          }}
          component={PhotoCamera}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;