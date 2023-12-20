import { View, Text, Image, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { getWarehouses } from '../../../api/warehouse/warehouse'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { COLORS } from '../../../constants'
import { WAREHOUSE, mSQUARE } from '../../../constants/strings'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import Carousel from 'react-native-reanimated-carousel'
import { currencyFormat } from '../../common/utils'
import Checkbox from 'expo-checkbox'

const Warehouse = ({
  fetching,
  choose,
  wizard,
  checked,
  setChecked,
  data,
  params,
}) => {
  const width = Dimensions.get('window').width
  const dispatch = store.dispatch
  const toast = useToast()

  const [warehouses, setWarehouses] = useState()
  useEffect(() => {
    if (!warehouses && !wizard) {
      getWarehouses(null, dispatch, setWarehouses, toast)
    }
  }, [])
  useEffect(() => {
    if (data && wizard) {
      setWarehouses(data)
    }
  }, [data])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
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
            <Carousel
              loop={false}
              height={width / 2}
              width={width}
              pagingEnabled={true}
              data={item?.warehouse_images}
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
          </SingleCard>
        )
      })}
    </View>
  )
}

export default Warehouse
