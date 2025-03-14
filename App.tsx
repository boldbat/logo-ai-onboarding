import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <AppNavigator />
    </>
  );
}
