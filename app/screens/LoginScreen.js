import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase';

export default function HomeScreen(props) {
  
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
            navigation.navigate('Home')
        }
    })

    return unsubscribe 
    }, [])

  const handleSignUp = () => {
      auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
          const user = userCredentials.user;
          console.log(user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
      auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log("Logged in with", user.email);
    })
    .catch(error => alert(error.message))
  }

  return ( 

    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
            <View 
                style={styles.inputContainer}>
                <TextInput 
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Email"
                   
                    style = {styles.input} />
                <TextInput 
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style = {styles.input}
                    secureTextEntry />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                     onPress={handleLogin}
                    style={styles.button}>
                    <Text
                        style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutLine]}>
                    <Text
                        style={styles.buttonOutLinetext}>Register</Text>
                </TouchableOpacity>
            </View>
    </KeyboardAvoidingView>
  );
  
}

const styles = StyleSheet.create ({
    container: {    
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782f9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutLine: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782f9',
        borderWidth: 2 
    },
    buttonOutLinetext: {
        color: '#0782f9',
        fontWeight: '700',
        fontSize: 16
    }
})