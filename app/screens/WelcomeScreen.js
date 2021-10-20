import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
// Firebase
import { auth } from '../../firebase';

export default function WelcomeScreen({ navigation }) {
  
  const goToLogin = () => { navigation.navigate('Login') };
  const goToSignUp = () => { navigation.navigate('Sign Up') };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
            navigation.navigate('Home')
        }
    })

    return unsubscribe 
    }, [])

  return (
    <ImageBackground style={styles.background} source={require('../assets/background.jpg')}>
      <View style={styles.logoContainer}> 
        <Image style={styles.logo} source={require('../assets/Barangay New Ilalim Logo.png')} />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={goToSignUp}>
        <Text style={styles.signUpButtontext}>Create Account</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10
  },
  loginButton: {
    width: '70%',
    padding: 15,
    backgroundColor: '#0782f9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loginText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  signUpButton: {
    width: '70%',
    padding: 15,
    marginTop: 5,
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782f9',
    borderWidth: 2 ,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  signUpButtontext: {
    color: '#0782f9',
    fontWeight: '700',
    fontSize: 16
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