import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Shorts from './screens/Shorts';

const Navigation = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          //cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{animationEnabled: false}}
        />
        <Stack.Screen
          name="Shorts"
          component={Shorts}
          options={{animationEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
