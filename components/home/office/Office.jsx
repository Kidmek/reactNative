import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './office.style'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { COLORS } from '../../../constants'
import { useNavigation } from 'expo-router'
import { getOffices } from '../../../api/office/office'

const Office = ({ fetching }) => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()

  const [offices, setOffices] = useState()
  useEffect(() => {
    getOffices(null, dispatch, setOffices, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('new', {
            screen: 'office',
          })
        }}
        style={styles.headerBtn}
      >
        <AntDesign name='plus' size={20} color={'white'} />
        <Text style={styles.headerTitle}>New Office</Text>
      </TouchableOpacity>
      <View style={styles.listContainer}>
        {offices?.data?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.officeContainer}
              onPress={() => {
                navigation.navigate('details', {
                  screen: 'office',
                  params: {
                    id: item.id,
                    name: item.name,
                  },
                })
              }}
            >
              <View style={styles.textContainer}>
                <Text style={styles.name} numberOfLines={1}>
                  {item?.name}
                </Text>
                <Text style={styles.type}>{item?.space + ' m\u00B2'} </Text>
                <Text style={styles.type}>{item?.price}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default Office
