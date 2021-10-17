import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TestComponent } from '../components/app';
import { auth } from '../../firebase';

export default function HomeScreen(props) {

  const navigation = useNavigation()
  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => 
      navigation.replace('Login'))
    .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
        <Text>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity 
          onPress={handleSignOut}
          style={styles.button}>
          <Text
            style={styles.buttonText}>
              Sign Out</Text>
        </TouchableOpacity>
    </View>
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0782f9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
})