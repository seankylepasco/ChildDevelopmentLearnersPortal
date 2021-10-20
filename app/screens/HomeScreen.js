import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
// Firebase
import firebase from 'firebase/app';
// Auth
import { auth } from '../../firebase';


export default function HomeScreen(props) {
  
  useEffect(() => {
      postsData();
      user();
  }, [])
  const [userData, setUser] = useState([]);
  const userRef = firebase.firestore().collection('users');
  const user = () => {  
    userRef
    .where('email', '==', auth.currentUser?.email)
    .onSnapshot(
      querySnapshot => {
          const newUser = []
          querySnapshot.forEach(doc => {
              const user = doc.data()
              user.id = doc.id
              newUser.push(user)
          });
          setUser(newUser)
      },
      error => {
          console.log(error)
      }
    )
  }
  const postRef = firebase.firestore().collection('posts');
  const postsData = () => { 
    postRef
    .orderBy('timestamp', 'desc')
    .onSnapshot(
      querySnapshot => {
        const newPosts = []
        querySnapshot.forEach(doc => {
          const post = doc.data()
          post.id = doc.id
          newPosts.push(post)
        });
        setPosts(newPosts)
      }
    )
  }
  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => 
      navigation.replace('Login'))
    .catch(error => alert(error.message))
  }
  const renderEntity = ({item, index}) => {
    const itemImage = item.image;
    if(itemImage === ''){
      return (
        <View style={styles.item}>
            <Text style={styles.postsText}>
                {/* {index}.  */}
              Title: {item.title}
            </Text>
            <Text>
              {item.description}
            </Text>
        </View>
      )
    }
    else {
      return (
        <View style={styles.item}>
            <Text style={styles.postsText}>
                {/* {index}.  */}
              Title: {item.title}
            </Text>
            <Text>
              {item.description}
            </Text>
          <Image source={{ uri: item.image }} style={styles.image}/>
        </View>
      )
    }
  }
  const renderUser = ({item, index}) => {
    return (
      <View>
          <Text>Name: {item.name}</Text>
          <Text>Email: {item.email}</Text>
      </View>
    )
  }
  const [posts, setPosts] = useState([])
  const navigation = useNavigation()
  const goToPost = () => navigation.navigate('Create Post')
  
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        onPress={goToPost}
        style={styles.button}>
        <Text
          style={styles.buttonText}>
          Post
        </Text>
      </TouchableOpacity>
      { userData && (
        <View>
          <FlatList 
          data={userData} 
          keyExtractor={(item) => item.id} 
          renderItem={renderUser} 
          />
        </View>
      )}
        <TouchableOpacity 
          onPress={handleSignOut}
          style={styles.button}>
          <Text
            style={styles.buttonText}>
              Sign Out</Text>
        </TouchableOpacity>
      { posts && (
          <View style={styles.listContainer}>
            <FlatList
              data={posts}
              renderItem={renderEntity}
              keyExtractor={(item) => item.id}
              removeClippedSubviews={true}
            />
          </View>
        )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20
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
  item: {
    backgroundColor: '#f5f520',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
  },
  listContainer: {
    width: '100%',
    backgroundColor: 'white',
    height: '70%',
    marginTop:30,
    padding:2,
  },  
  postsText: {
    fontSize: 20,
    color: '#333333'  
  }
})