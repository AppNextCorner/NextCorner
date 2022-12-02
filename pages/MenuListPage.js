import { StyleSheet, View, Text, Image, Pressable, FlatList } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

export default function MenuListPage() {
  const route = useRoute()
  const navigation = useNavigation()

  //   Button function solves the issue of not having to use the build in header property in the navigation component -> uses a custom navigation button instead
  const goHome = () => {
    navigation.navigate('Home')
  }

  // accessing and pinpointing data
  const menuArray = route.params.menu.map(val => val)

  
  console.log(route.params.menu)
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Pressable style={styles.goBackButton} onPress={goHome}>
          <Feather name="arrow-left-circle" size={40} color="white" />
        </Pressable>

        <Image style={styles.image} source={route.params.foodImage} />
        <Text style={styles.title}>{route.params.name}</Text>
        <View style={styles.description}>
          <Text style={styles.textDescription}>{route.params.description}</Text>
        </View>

        {/* Menu list containing food items */}
        <View>
            <FlatList 
                data={route.params.menu}
                renderItem={({ item }) => {
                    
                    return(

                           <MenuListPage foodItem={item} /> 

                    )
                }}
            />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  goBackButton: {
    zIndex: 2,
    margin: 20,
    marginTop: 40,
  },
  description: {
    flex: 0,
    backgroundColor: 'yellow',
    marginHorizontal: 20,
    marginTop: 15,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginTop: -105,
  },
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
})
