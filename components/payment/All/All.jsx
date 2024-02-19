import { View } from 'react-native'
import React from 'react'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { useEffect } from 'react'
import { getOrders } from '../../../api/order/order'
import CardDetail from '../../common/detail/CardDetail'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import styles from '../../common/styles/common.style'
import { currencyFormat } from '../../common/utils'

const All = ({ refresh }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [orders, setOrders] = useState()

  useEffect(() => {
    getOrders(null, dispatch, setOrders, toast)
  }, [refresh])
  return (
    <View style={styles.container}>
      {orders?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            isOnlyText={true}
            page={{
              name: 'details',
              screen: 'payment',
              params: { id: item?.id },
            }}
          >
            <View style={{ ...styles.onlyTextContainer, borderWidth: 0 }}>
              <CardDetail
                label={'Order Type'}
                value={item?.OrderTypeDetail?.ordertype_name}
              />
              <CardDetail
                label={'Total Price'}
                value={currencyFormat(item?.totalprice ?? '0')}
                isPrice={true}
              />
              <CardDetail
                label={'Time Duration'}
                value={item?.remaining_date + ' Days'}
              />
              <CardDetail label={'Status'} value={item?.status} />

              <CardDetail
                label={'Ordered'}
                value={
                  item?.OrderTypeDetail?.ordertype_name == 'Storage'
                    ? item?.orderStorage?.storage_name
                    : item?.warehousedetail?.warehouse_name
                }
              />

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
