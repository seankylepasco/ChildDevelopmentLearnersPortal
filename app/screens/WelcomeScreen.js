import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity, Button } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  
  const loginPress = () => console.log('logged in!');
  const createPress = () => console.log('create new account!');
  const goToLogin = () => { navigation.navigate('Login') };

  return (
    <ImageBackground style={styles.background} source={require('../assets/background.jpg')}>
      <View style={styles.logoContainer}> 
        <Image style={styles.logo} source={require('../assets/Barangay New Ilalim Logo.png')} />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={createPress}>
        <Text style={styles.loginText}>Create Account</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginButton: {
    width: '100%',
    height: 80,
    backgroundColor: '#63CBC8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 20
  },
  signUpButton: {
    width: '100%',
    height: 80,
    backgroundColor: '#FFB085',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    opacity: .3
  },
  logoContainer: {
    position: 'absolute',
    top: 200,
    alignItems: 'center'
  }
})