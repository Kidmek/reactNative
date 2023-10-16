import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import React from 'react'
import styles from '../../started/started.style'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import Search from '../../../common/search/Search'
import { store } from '../../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { getTransportationMethods } from '../../../../api/shipment/shipment'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../../features/data/dataSlice'
import { COLORS } from '../../../../constants'

const Methods = () => {
  const [searchQuery, setSearchQuery] = useState()
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()
  const [methods, setMethods] = useState()
  const fetching = useSelector(selectIsFetching)

  useEffect(() => {
    getTransportationMethods(null, dispatch, setMethods, toast)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Search
        onSearch={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('new', {
              screen: 'warehouse',
            })
          }}
          style={styles.headerBtn}
        >
          <AntDesign name='plus' size={20} color={'white'} />
          <Text style={styles.headerTitle}>New Transportation Method</Text>
        </TouchableOpacity>
      </View>
      {fetching ? (
        <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
      ) : (
        methods?.data?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.warehouseContainer}
              onPress={() => {
                navigation.navigate('details', {
                  screen: 'warehouse',
                  params: { type: 'Unmanaged', id: item.id },
                })
              }}
            >
              <View style={styles.textContainer}>
                <Text style={styles.name} numberOfLines={1}>
                  {item?.name}
                </Text>
                <Text style={styles.type}>{item?.description}</Text>
                <Text style={styles.type}>{item?.created_at}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      )}
    </ScrollView>
  )
}

export default Methods
