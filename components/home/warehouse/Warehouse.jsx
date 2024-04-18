import {
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { getWarehouses } from '../../../api/warehouse/warehouse'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { COLORS, SIZES } from '../../../constants'
import { RENTER, WAREHOUSE, mSQUARE } from '../../../constants/strings'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import Carousel from 'react-native-reanimated-carousel'
import { currencyFormat } from '../../common/utils'
import Checkbox from 'expo-checkbox'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { useSelector } from 'react-redux'
import { selectData } from '../../../features/data/dataSlice'

const Warehouse = ({
  choose,
  wizard,
  checked,
  setChecked,
  data,
  params,
  refresh,
}) => {
  const width = Dimensions.get('window').width
  const dispatch = store.dispatch
  const toast = useToast()
  const navigate = useNavigation()
  const user = useSelector(selectData)
  const [warehouses, setWarehouses] = useState()
  useEffect(() => {
    if (!wizard) {
      getWarehouses(null, dispatch, setWarehouses, toast)
    }
  }, [refresh])
  useEffect(() => {
    if (data && wizard) {
      setWarehouses(data)
    }
  }, [data])

  return wizard && !warehouses ? (
    <ActivityIndicator color={COLORS.primary} size={SIZES.xxLarge} />
  ) : (
    <View style={styles.container}>
      {!choose && !wizard && (
        <AddNew
          title={'New Warehouse'}
          page={{
            name: 'new',
            screen: 'warehouse',
            params: { type: 'Unmanaged' },
          }}
        />
      )}
      {wizard && <Text style={styles.wizTitle}>Choose Warehouse</Text>}

      {warehouses?.results?.map((item, index) => {
        console.log(item.warehouse_images)
        return (
          <SingleCard
            key={index}
            navigate={!wizard}
            page={
              !choose
                ? {
                    name: 'details',
                    screen: 'warehouse',
                    params: { type: 'Unmanaged', id: item.id },
                  }
                : {
                    name: 'new',
                    screen: 'order',
                    params: { type: WAREHOUSE, id: item.id, params },
                  }
            }
            onClick={() => {
              if (setChecked) {
                setChecked(item.id)
              }
            }}
          >
            {user?.groupdetail?.name?.toLowerCase() === RENTER && (
              <Pressable
                style={{
                  position: 'absolute',
                  zIndex: 1000,
                  right: '5%',
                  top: '5%',
                  borderRadius: SIZES.medium,
                  backgroundColor: COLORS.primary + 'e5',
                  padding: SIZES.small,
                }}
                onPress={() => {
                  navigate.navigate('new', {
                    screen: 'warehouse',
                    params: {
                      id: item?.id,
                    },
                  })
                }}
              >
                <AntDesign
                  name='edit'
                  size={SIZES.welcomeTabIcons}
                  color={'white'}
                />
              </Pressable>
            )}
            <Carousel
              loop={true}
              height={width / 2}
              width={width}
              pagingEnabled={true}
              data={item?.warehouse_images}
              autoPlay={wizard ? true : false}
              scrollAnimationDuration={1000}
              autoPlayInterval={2500}
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

            <View style={styles.wizCheckerHeader}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item?.warehouse_name}</Text>

                <Text>
                  <Text style={styles.jobName}>{item?.region} , </Text>
                  <Text style={styles.type}>{item?.city} , </Text>
                  <Text style={styles.type}>{item?.sub_city}</Text>
                </Text>
                <Text style={styles.type}>{item?.space + ' ' + mSQUARE} </Text>
                <Text style={styles.type}>
                  {currencyFormat(item?.full_price)} Birr
                </Text>
              </View>
              {wizard && (
                <Checkbox
                  color={COLORS.primary}
                  value={checked === item.id}
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
            {wizard && <View style={{ ...styles.divider, width: '100%' }} />}
          </SingleCard>
        )
      })}
    </View>
  )
}

export default Warehouse
