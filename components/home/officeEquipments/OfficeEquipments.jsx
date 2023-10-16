import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './officeEquipments.style'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { getWarehouses } from '../../../api/warehouse/warehouse'
import { FlatList } from 'react-native-gesture-handler'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { useNavigation } from 'expo-router'
import { COLORS } from '../../../constants'
import { getOfficeEquipments } from '../../../api/office/office'

const OfficeEquipments = ({ fetching }) => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()

  const [officeEquipments, setOfficeEquipments] = useState()
  useEffect(() => {
    getOfficeEquipments(null, dispatch, setOfficeEquipments, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('new', {
            screen: 'equipment',
          })
        }}
        style={styles.headerBtn}
      >
        <AntDesign name='plus' size={20} color={'white'} />
        <Text style={styles.headerTitle}>New Office Equipment</Text>
      </TouchableOpacity>

      {officeEquipments?.data?.map((item, index) => {
        return (
          <TouchableOpacity key={index} style={styles.warehouseContainer}>
            <Image style={styles.image} source={{ uri: item?.image }} />

            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.name}
              </Text>
              <Text style={styles.type}>{item?.equipment_type}</Text>
              <Text style={styles.type}>${item?.price}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default OfficeEquipments
