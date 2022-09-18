import React from 'react';
import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';

import { Home } from './src/screens/Home';
import { Subscription } from 'expo-modules-core';

import { Loading } from './src/components/Loading';
import { Background } from "./src/components/Background";
import { Routes } from './src/routes';

import './src/services/notificationConfig';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';


export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, [])

  return (
    <Background>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      { fontsLoaded ? <Routes /> : <Loading /> }

    </Background>
  );
}
