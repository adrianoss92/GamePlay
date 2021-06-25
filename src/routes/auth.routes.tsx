import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { SignIn } from '../screens/Signin';
import { AppointmentDetails } from '../screens/AppointmentDetails';

import { theme } from '../global/theme';


const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes(){
  return(
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.secondary100
        }
      }}
    >

      <Screen
        name="SignIn"
        component={SignIn}
      />
      <Screen
        name="Home"
        component={Home}
      />
      <Screen
        name="AppointmentDetails"
        component={AppointmentDetails}
      />
    </Navigator>
  );
}
// Este componente é utilizado para realizar a navegação entre as telas, onde ao clicar em um determinado botão, será realizada a chamada do router e o router por sua vez renderia a tela.