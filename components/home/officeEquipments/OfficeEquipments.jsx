import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import styles from '../../common/styles/common.style'
import { COLORS } from '../../../constants'
import { getOfficeEquipments } from '../../../api/office/office'
import AddNew from '../../common/header/AddNew'

const OfficeEquipments = ({ fetching }) => {
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
      <AddNew
        title={'New Office Equipment'}
        page={{
          name: 'new',
          screen: 'equipment',
        }}
      />

      {officeEquipments?.results?.map((item, index) => {
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
