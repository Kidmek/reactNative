import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import React from 'react'
import styles from '../started/started.style'
import welcomeStyles from '../welcome/welcome.style'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import Search from '../../common/search/Search'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { getTransportations } from '../../../api/shipment/shipment'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { COLORS } from '../../../constants'

const Transportations = () => {
  const [searchQuery, setSearchQuery] = useState()
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()
  const [transportations, setTransportations] = useState()
  const fetching = useSelector(selectIsFetching)

  useEffect(() => {
    getTransportations(null, dispatch, setTransportations, toast)
  }, [])

  return (
    <ScrollView style={welcomeStyles.welcomeContainer}>
      <View style={welcomeStyles.shipmentHeader}>
        <TouchableOpacity
          style={welcomeStyles.shipmentHeaderWrapper}
          onPress={() => {
            navigation.navigate('details', {
              screen: 'transportation_methods',
            })
          }}
        >
          <Feather size={30} name='truck' />
          <View style={styles.textContainer}>
            <Text style={styles.name}>0</Text>
            <Text style={styles.name}>Transportaion Methods</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Search
        onSearch={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('new', {
            //   screen: 'warehouse',
            // })
          }}
          style={styles.headerBtn}
        >
          <AntDesign name='plus' size={20} color={'white'} />
          <Text style={styles.headerTitle}>New Transportation</Text>
        </TouchableOpacity>
      </View>

      {fetching ? (
        <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
      ) : (
        transportations?.data?.map((item, index) => {
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
                  Name : {item?.transportation_name}
                </Text>
                <Text style={styles.jobName}>
                  Transportation Type : {item?.transportation_type?.name}
                </Text>
                <Text style={styles.type}>
                  Plate Number : {item?.licence_plate}
                </Text>
                <Text style={styles.type}>Weight : {item?.limited_weight}</Text>
                <Text style={styles.type}>Created At : {item?.created_at}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      )}
    </ScrollView>
  )
}

export default Transportations
