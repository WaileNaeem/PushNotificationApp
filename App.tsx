import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {useEffect} from 'react'
import FlashMessage from "react-native-flash-message";
import { notificationListener, requestUserPermission } from './src/utils/notificationServices'

const App = () => {
  useEffect(() => {
    requestUserPermission()
    notificationListener()
  }, [])
  
  return (
    <View>
      <Text>App</Text>
      <FlashMessage position="top" />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})