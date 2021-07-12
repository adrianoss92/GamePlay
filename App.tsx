import React from 'react';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import AppLoading from 'expo-app-loading';
import { AuthProvider } from './src/hooks/auth';
import { Routes } from './src/routes';
import { StatusBar, LogBox } from 'react-native';
import { Background } from './src/components/Background';

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine.'])

export default function App(){

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });

  if(!fontsLoaded){ //Enquanto as fontes acima não forem carregadas, o app irá ficar na tela de splash
    return <AppLoading/>  // após o carregamento das fontes o app sego o seu fluxo normalmente
  }

  return (
    <Background>
      <StatusBar 
        barStyle="light-content" //Mudar a cor da barra de status
        backgroundColor= "transparent" //Deixa o funda da barra de status transparent
        translucent //Fazer com que o fundo do app seja o backGround da statusBar
      
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  );
}