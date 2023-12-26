import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants'
import { AntDesign } from '@expo/vector-icons'
import styles from './styles/warehouse.style'
import storageStyles from './styles/storage.style'
import { useEffect } from 'react'
import { getShelves } from '../../api/storage/storage'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../features/data/dataSlice'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../store'
import AddNew from '../../components/common/header/AddNew'

const shelve_type = () => {
  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const [shelves, setShelves] = useState()
  const toast = useToast()
  const fetch = () => {
    getShelves(null, dispatch, setShelves, toast)
  }

  useEffect(() => {
    fetch()
  }, [])
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={fetching} onRefresh={fetch} />
      }
    >
      <View style={styles.header}>
        <AddNew
          title={'New Storage Method'}
          page={{
            name: 'new',
            screen: 'shelve_type',
          }}
        />
      </View>
      <View style={storageStyles.listContainer}>
        {shelves &&
          shelves.results &&
          shelves.results.map((shelve, index) => (
            <View key={index} style={storageStyles.singleItem}>
              <Text style={styles.name}>{shelve.name}</Text>
              <Text style={styles.type}>{shelve.description}</Text>

              <View style={storageStyles.singleBtnContainer}>
                <TouchableOpacity style={storageStyles.btn(false)}>
                  <AntDesign name='edit' size={15} color={'white'} />
                  <Text style={{ color: 'white' }}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>
    </ScrollView>
  )
}

export default shelve_type
