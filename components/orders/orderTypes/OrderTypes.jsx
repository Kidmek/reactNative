import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import { COLORS, SIZES } from '../../../constants'
import { getOrderTypes } from '../../../api/order/order'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import Checkbox from 'expo-checkbox'
const OrderTypes = ({ params, wizard, checked, setChecked, data, refresh }) => {
  const dispatch = store.dispatch
  const toast = useToast()
  const fetching = useSelector(selectIsFetching)
  const [orderTypes, setOrderTypes] = useState(data)

  const fetch = () => {
    getOrderTypes(null, dispatch, setOrderTypes, toast)
  }
  useEffect(() => {
    if (!wizard) {
      fetch()
    }
  }, [refresh])
  useEffect(() => {
    if (data && wizard) {
      setOrderTypes(data)
    }
  }, [data])
  return (
    <ScrollView
      style={wizard ? {} : styles.welcomeContainer}
      refreshControl={
        <RefreshControl refreshing={fetching} onRefresh={fetch} />
      }
    >
      {!params?.choose && !wizard && (
        <View style={styles.cardsContainer}>
          <AddNew
            title={'New Order Type'}
            page={{
              name: 'new',
              screen: 'order_type',
            }}
          />
        </View>
      )}
      <View>
        {wizard && (
          <View>
            <Text style={styles.wizTitle}>
              What Type Of Space Would You Like To Rent?
            </Text>
          </View>
        )}
        {orderTypes?.results?.map((item, index) => {
          return (
            <SingleCard
              key={index}
              navigate={!wizard}
              page={
                params?.choose
                  ? {
                      name: 'new',
                      screen: 'choose_for_order',
                      params: {
                        type: item?.ordertype_name,
                        typeId: item?.id,
                      },
                    }
                  : {}
              }
              onClick={() => {
                if (setChecked) {
                  setChecked({
                    id: item?.id,
                    name: item?.ordertype_name,
                  })
                }
              }}
              isOnlyText={true}
            >
              <View
                style={{
                  ...styles.onlyTextContainer,
                  padding: 0,
                  paddingHorizontal: SIZES.medium,
                }}
              >
                <View style={styles.wizCheckerHeader}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item?.ordertype_name}
                  </Text>
                  {wizard && (
                    <Checkbox
                      color={COLORS.primary}
                      value={checked?.id === item.id}
                      onValueChange={(value) => {
                        if (value) {
                          setChecked({
                            id: item?.id,
                            name: item?.ordertype_name,
                          })
                        }
                      }}
                    />
                  )}
                </View>

                <Text style={{ ...styles.type }}>{item?.meta}</Text>
              </View>
            </SingleCard>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default OrderTypes
