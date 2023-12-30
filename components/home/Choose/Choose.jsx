import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import styles from './choose.style'
import { useNavigation } from 'expo-router/src/useNavigation'
import { CUSTOMS, SHIPMNET, SPACE } from '../../../constants/strings'
const Choose = () => {
  const navigation = useNavigation()
  const singleCard = (title, to) => {
    return (
      <Pressable
        style={styles.singleCard}
        onPress={() => {
          navigation.navigate('new', {
            screen: 'steps',
            params: { type: to },
          })
        }}
      >
        <Text style={styles.cardText}>{title}</Text>
        <View style={styles.btmRightBox} />
        <View style={styles.btmLeftBox} />
        <View style={styles.topLeftBox} />
        <View style={styles.topRightBox} />
      </Pressable>
    )
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>What Are You Looking For?</Text>
      <View style={styles.cardContainer}>
        {singleCard('Space Management', SPACE)}
        {singleCard('Transportation & Logistics', SHIPMNET)}
        {singleCard('Customs Transit', CUSTOMS)}
      </View>
    </ScrollView>
  )
}

export default Choose
