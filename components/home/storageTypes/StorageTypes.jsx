import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './storageTypes.style'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { useNavigation } from 'expo-router'
import { getStorages } from '../../../api/storage/storage'
import { COLORS } from '../../../constants'

const StorageType = ({ fetching }) => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()

  const [storageTypes, setStorageTypes] = useState()
  useEffect(() => {
    getStorages(null, dispatch, setStorageTypes, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.shelveBtn}
        onPress={() => {
          navigation.navigate('details', {
            screen: 'shelve_type',
          })
        }}
      >
        <Text style={styles.name}>Shelve Types</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('new', {
            screen: 'storage',
          })
        }}
        style={styles.headerBtn}
      >
        <AntDesign name='plus' size={20} color={'white'} />
        <Text style={styles.headerTitle}>New Storage</Text>
      </TouchableOpacity>

      <View style={styles.listContainer}>
        {storageTypes?.data?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.storageTypeContainer}
              onPress={() => {
                navigation.navigate('details', {
                  screen: 'storage',
                  params: { name: item?.storage_name, id: item?.id },
                })
              }}
            >
              {/* <AntDesign name='storage' size={40} color={'black'} /> */}
              <View style={styles.textContainer}>
                <Text style={styles.name} numberOfLines={1}>
                  {item?.storage_name}
                </Text>
                <Text style={styles.type}>
                  <Text style={styles.label}>Space : </Text>
                  {item?.space + ' m\u00B2'}{' '}
                </Text>
                <Text style={styles.type}>
                  <Text style={styles.label}>Terminal : </Text>
                  {item?.terminal}
                </Text>
                <Text style={styles.type}>
                  <Text style={styles.label}>Price : </Text>$
                  {item?.storage_type_price}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default StorageType
