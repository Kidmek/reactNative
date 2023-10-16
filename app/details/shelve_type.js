import {
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants'
import { AntDesign } from '@expo/vector-icons'
import styles from './styles/warehouse.style'
import storageStyles from './styles/storage.style'
import { useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { getShelves } from '../../api/storage/storage'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../features/data/dataSlice'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../store'

const shelve_type = () => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const [shelves, setShelves] = useState()
  const toast = useToast()

  useEffect(() => {
    getShelves(null, dispatch, setShelves, toast)
  }, [])
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('new', {
              screen: 'shelve_type',
            })
          }}
          style={styles.headerBtn}
        >
          <AntDesign name='plus' size={20} color={'white'} />
          <Text style={styles.btnText}>New Shelve Type</Text>
        </TouchableOpacity>
      </View>
      {fetching ? (
        <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
      ) : (
        <View style={storageStyles.listContainer}>
          {shelves &&
            shelves.data &&
            shelves.data.map((shelve, index) => (
              <View key={index} style={storageStyles.singleItem}>
                <Text style={styles.name}>{shelve.name}</Text>
                <Text style={styles.subName}>
                  Description: {shelve.description}
                </Text>

                <View style={storageStyles.singleBtnContainer}>
                  <TouchableOpacity style={storageStyles.btn(false)}>
                    <AntDesign name='edit' size={15} color={'white'} />
                    <Text style={{ color: 'white' }}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      )}
    </ScrollView>
  )
}

export default shelve_type
