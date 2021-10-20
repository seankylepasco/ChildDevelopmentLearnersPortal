import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
// Auth
import { auth } from '../../firebase';
// Firebase
import firebase from 'firebase/app';

export default function SignUpScreen(props) {
  
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  
  useEffect(() => {
    }, [])

  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
        const uid = response.user.uid
        const data = {
            id: uid,
            email,
            name,
        };
        const usersRef = firebase.firestore().collection('users')
        usersRef
        .doc(uid)
        .set(data)
        .then(() => {
            navigation.navigate('Home', {user: data})
        })
        .catch((error) => {
            alert(error)
        });
    })
    .catch(error => alert(error.message))
  }

  return ( 
    <ImageBackground style={styles.container} source={require('../assets/background.jpg')}>
        <View 
            style={styles.inputContainer}>
            <TextInput 
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder="Email"
                style = {styles.input} 
            />
            <TextInput 
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style = {styles.input}
                secureTextEntry 
            />
             <TextInput 
                placeholder="Full Name"
                value={name}
                onChangeText={text => setName(text)}
                style = {styles.input}
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutLine]}>
                <Text
                    style={styles.buttonOutLinetext}>
                    Register
                </Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
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