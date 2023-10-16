import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import React from 'react'
import styles from '../started/started.style'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import Search from '../../common/search/Search'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { getShipmentTerms } from '../../../api/shipment/shipment'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import { COLORS } from '../../../constants'
const Terms = () => {
  const [searchQuery, setSearchQuery] = useState()
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()
  const [terms, setTerms] = useState()
  const fetching = useSelector(selectIsFetching)

  useEffect(() => {
    getShipmentTerms(null, dispatch, setTerms, toast)
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
          <Text style={styles.headerTitle}>New Shipment Term</Text>
        </TouchableOpacity>
      </View>
      {fetching ? (
        <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
      ) : (
        terms?.data?.map((item, index) => {
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
                  {item?.term_name}
                </Text>
                <Text style={styles.jobName}>{item?.term_meta}</Text>

                <Text style={styles.type}>{item?.created_at}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      )}
    </ScrollView>
  )
}

export default Terms
