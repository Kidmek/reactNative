import { View, Text, Image, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { useNavigation } from 'expo-router'
import { getMappedStorages, getStorages } from '../../../api/storage/storage'
import { COLORS, SIZES } from '../../../constants'
import { STORAGE, mSQUARE } from '../../../constants/strings'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import Carousel from 'react-native-reanimated-carousel'
import { currencyFormat } from '../../common/utils'
import Checkbox from 'expo-checkbox'

const StorageType = ({
  fetching,
  choose,
  wizard,
  checked,
  setChecked,
  data,
  params,
}) => {
  const width = Dimensions.get('window').width

  const navigation = useNavigation()
  const dispatch = store.dispatch
  const toast = useToast()

  const [storageTypes, setStorageTypes] = useState()
  useEffect(() => {
    if (!wizard) {
      if (choose) {
        getMappedStorages(null, dispatch, setStorageTypes, toast)
      } else {
        getStorages(null, dispatch, setStorageTypes, toast)
      }
    }
  }, [])
  useEffect(() => {
    if (data && wizard) {
      setStorageTypes(data)
    }
  }, [data])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      {!choose && !wizard && (
        <TouchableOpacity
          style={{ ...styles.shipmentHeaderWrapper, marginBottom: SIZES.small }}
          onPress={() => {
            navigation.navigate('details', {
              screen: 'shelve_type',
            })
          }}
        >
          <Text style={styles.name}>Storage Methods</Text>
        </TouchableOpacity>
      )}
      {!choose && !wizard && (
        <AddNew
          title={'New Storage Type'}
          page={{
            name: 'new',
            screen: 'storage_type',
          }}
        />
      )}
      {wizard && <Text style={styles.wizTitle}>Choose Storage Types</Text>}
      {storageTypes?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            navigate={!wizard}
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
                    params: { type: STORAGE, id: item.id, params },
                  }
            }
            onClick={() => {
              if (setChecked) setChecked(item.id)
            }}
          >
            {/* <AntDesign name='storage' size={40} color={'black'} /> */}
            <Carousel
              loop={false}
              height={width / 2}
              width={width}
              pagingEnabled={true}
              data={
                choose || wizard
                  ? item?.warehouse_storage_type?.storagetypeimages
                  : item?.storagetypeimages
              }
              onSnapToItem={(index) => {}}
              scrollAnimationDuration={1000}
              renderItem={({ item: image }) => (
                <Image
                  style={{ ...styles.image, alignSelf: 'center' }}
                  source={{ uri: image?.images }}
                />
              )}
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
            />

            <View style={{ ...styles.wizCheckerHeader }}>
              <View style={styles.textContainer}>
                {(choose || wizard) && (
                  <View>
                    <Text style={styles.name}>
                      {item?.warehouse_storage_type?.storage_name} ,{' '}
                      {item?.warehousedetail?.city},
                      {item?.warehousedetail?.region},
                      {item?.warehousedetail?.sub_city}
                    </Text>
                    <Text style={styles.type}>
                      Available Space : {item?.available_space}
                    </Text>
                    <Text style={styles.type}>
                      Storage Height : {item?.height} {item?.heighunit}
                    </Text>
                    <Text style={styles.type}>
                      Temprature : {item?.maxtemp} - {item?.mintemp}
                    </Text>
                    <Text style={styles.type}>
                      Total Price : {currencyFormat(item.totalprice ?? 0)} Birr
                    </Text>
                  </View>
                )}
                <Text style={styles.middle}>{item?.storage_type_meta}</Text>
                <Text style={styles.type}>{item?.status}</Text>
              </View>
              {wizard && (
                <Checkbox
                  color={COLORS.primary}
                  value={checked === item?.id}
                  onValueChange={(value) => {
                    if (value) {
                      if (setChecked) {
                        setChecked(item?.id)
                      }
                    }
                  }}
                />
              )}
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default StorageType
