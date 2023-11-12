import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { useNavigation } from 'expo-router'
import { getMappedStorages, getStorages } from '../../../api/storage/storage'
import { COLORS } from '../../../constants'
import { STORAGE, mSQUARE } from '../../../constants/strings'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const StorageType = ({ fetching, choose }) => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()

  const [storageTypes, setStorageTypes] = useState()
  useEffect(() => {
    if (choose) {
      getMappedStorages(null, dispatch, setStorageTypes, toast)
    } else {
      getStorages(null, dispatch, setStorageTypes, toast)
    }
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      {!choose && (
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
      )}
      {!choose && (
        <AddNew
          title={'New Storage'}
          page={{
            name: 'new',
            screen: 'storage',
          }}
        />
      )}
      {storageTypes?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            page={
              !choose
                ? {
                    name: 'details',
                    screen: 'storage',
                    params: { name: item?.storage_name, id: item?.id },
                  }
                : {
                    name: 'new',
                    screen: 'order',
                    params: { type: STORAGE, id: item.id },
                  }
            }
          >
            {/* <AntDesign name='storage' size={40} color={'black'} /> */}
            <Image
              style={styles.image}
              source={{ uri: item?.warehouse_storage_type?.image }}
            />

            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.warehouse_storage_type?.storage_name}
              </Text>
              <Text style={styles.type}>
                <Text style={styles.label}>Space : </Text>
                {item?.available_space + ' ' + mSQUARE}{' '}
              </Text>
              <Text style={styles.type}>
                <Text style={styles.label}>Height : </Text>
                {item?.height + '' + item?.heightunit}
              </Text>
              <Text style={styles.type}>
                <Text style={styles.label}>Temprature : </Text>
                {item?.mintemp + ' - ' + item?.maxtemp + ' ' + item?.tempunit}
              </Text>
              <Text style={styles.type}>
                <Text style={styles.label}>Total Price : </Text>$
                {item?.totalprice + ' Birr \nBefore Taxes'}
              </Text>
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default StorageType
