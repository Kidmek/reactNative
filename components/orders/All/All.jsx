import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../../../constants'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { useEffect } from 'react'
import { getOrders } from '../../../api/order/order'
import CardDetail from '../../common/detail/CardDetail'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import styles from '../../common/styles/common.style'

const All = ({ fetching }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [orders, setOrders] = useState()

  useEffect(() => {
    getOrders(null, dispatch, setOrders, toast)
  }, [])
  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <AddNew
        title={'New Order'}
        page={{
          name: 'details',
          screen: 'order_type',
        }}
      />

      {orders?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            page={{
              name: 'details',
              screen: 'warehouse',
              params: { type: 'Unmanaged', id: item.id },
            }}
          >
            <View style={styles.textContainer}>
              <CardDetail
                label={'Order Type'}
                value={item?.OrderTypeDetail?.ordertype_name}
              />
              <CardDetail
                label={'Ordered'}
                value={
                  item?.OrderTypeDetail?.ordertype_name == 'Storage'
                    ? item?.orderStorage?.storage_name
                    : item?.warehousedetail?.warehouse_name
                }
              />
              <CardDetail label={'Start Date'} value={item?.starting_date} />
              <CardDetail label={'End Date'} value={item?.end_date} />
              <CardDetail
                label={'Date Difference'}
                value={item?.OrderTypeDetail?.ordertype_name}
              />
              <CardDetail
                label={'Customer'}
                value={item?.UserDetail?.first_name}
              />
              <CardDetail label={'Price'} value={item?.price} isPrice={true} />
              <CardDetail label={'Status'} value={item?.status} />
              <CardDetail
                label={'Created At'}
                value={item?.created_at}
                isDate={true}
              />
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default All
