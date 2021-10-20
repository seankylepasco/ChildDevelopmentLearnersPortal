import React , { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
// Import ImagePicker with expo install expo-image-picker
import * as ImagePicker from 'expo-image-picker';
// Firebase
import firebase from 'firebase/app';
// Firebase Storage
require('firebase/storage');
// Firebase Database 
require('firebase/database')
// Auth
import { auth } from '../../../firebase';

export default function Create(props) {

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
      }
    })();
  }, []);
  const postsRef = firebase.firestore().collection('posts')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState('');
  const user = auth.currentUser?.email;
  const writePost = () => {
    if (title == ''){
      Alert.alert('Missing Title!')
    }
    else if (description == ''){
      Alert.alert('Missing Description!')
    }
    else {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            user: user,
            title: title,
            description: description,
            image: image,
            timestamp: timestamp
        };
        postsRef
            .add(data)
            .then(_doc => {
                setTitle('');
                setDescription('');
                setImage('');
                Keyboard.dismiss();
            })
            .catch((error) => {
                Alert.alert(error);
            });
    //   sendImageToFirebase();
    //   firebase.database().ref('posts/'+title).set({
    //     title,
    //     description,
    //     user,
    //     image
    //   })
    //   .then( () => {
    //     setTitle('');
    //     setImage('');
    //     setDescription('');
    //  })
    //   .catch( (error) =>  {})
    }
  }
  const uploadImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
      if (!result.cancelled) {
        setImage(result.uri);
      }
  };
    const sendImageToFirebase = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });
    if(blob === ''){
    }
    else {
      var ref = firebase.storage().ref().child(title+'='+user);
      const send =  ref.put(blob);
      send.on(firebase.storage.TaskEvent.STATE_CHANGED,() => {
        setUploading(false),
        (error) => {
          setUploading(false)
          blob.close()
          return
        },
        () => {
          send.snapshot.ref.getDownloadUrl().then((url)=>{
          setUploading(false)
          blob.close();
          return url;
        })
        }
      })
    }
  }

  return (
    <View style={styles.container}>
        <View 
          style={styles.inputContainer}>
          <TextInput 
            value={title}
            onChangeText={text => setTitle(text)}
            placeholder="Title"
            style = {styles.input} />
          <TextInput 
            value={description}
            onChangeText={text => setDescription(text)}
            placeholder="Description"
            style = {styles.input}
            />
        </View>
        {!!image && <Image source={{ uri: image }} style={{ width: 300, height: 300 , marginTop: 20}} />}
          <TouchableOpacity 
            onPress={uploadImage}
            style={styles.buttonUpload}>
              <Text
                style={styles.buttonText}>
                Upload a Image
              </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={writePost}
            style={styles.button}>
              <Text
                style={styles.buttonText}>
                Save Post
              </Text>
          </TouchableOpacity>
        {!!uploading && <ActivityIndicator style={styles.indicator} /> }
    </View>
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicator: {
    size: 'large',
    color: '#000'
  },
  buttonUpload: {
    backgroundColor: '#0782f9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30
  },
  button: {
    backgroundColor: '#0782f9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
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
})