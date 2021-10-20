import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import CreatePost from './app/screens/posts/Create';

export default function App(){

  const Stack = createNativeStackNavigator();

  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="Welcome" 
        options={{ headerShown: false }}
        component={WelcomeScreen} 
      />
      <Stack.Screen 
        name="Sign Up"  
        component={SignUpScreen} 
      />
      <Stack.Screen 
        name="Login"  
        component={LoginScreen} 
      />
      <Stack.Screen 
        name="Home"  
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Stack.Screen 
        name="Create Post"  
        component={CreatePost} 
      />
    </Stack.Navigator>
  </NavigationContainer>
  );


}