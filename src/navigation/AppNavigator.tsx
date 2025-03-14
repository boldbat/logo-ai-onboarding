import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PromptScreen from '../screens/PromptScreen';
import BenefitsScreen from '../screens/BenefitsScreen';
import PricingScreen from '../screens/PricingScreen';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Prompt: undefined;
  Benefits: undefined;
  Pricing: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Prompt" component={PromptScreen} />
        <Stack.Screen name="Benefits" component={BenefitsScreen} />
        <Stack.Screen name="Pricing" component={PricingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
