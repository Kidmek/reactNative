import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { COLORS } from '../../../constants'
import { getShipments } from '../../../api/shipment/shipment'
import CardDetail from '../../common/detail/CardDetail'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const Started = ({ fetching, type }) => {
  const dispatch = store.dispatch
  const toast = useToast()
  const [shipments, setShipments] = useState()

  const getProductQty = (shipments, productId) => {
    const product = shipments?.filter((ship) => ship.product == productId)
    if (product.length) {
      return product[0].productqty
    } else {
      return ''
    }
  }

  useEffect(() => {
    getShipments(type, dispatch, setShipments, toast)
  }, [type])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <AddNew
        title={'New Shipment'}
        page={{
          name: 'details',
          screen: 'shipment_type',
          params: { choose: true },
        }}
      />

      {shipments?.results?.map((item, index) => {
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
                label={'Shipment Method'}
                value={
                  item?.TransportationDetail?.TransportationTypeDetail?.name
                }
              />
              <CardDetail
                label={'Customer'}
                value={item?.productdetail?.userdetail?.first_name}
              />
              <CardDetail
                label={'Transportation'}
                value={item?.TransportationDetail?.transportation_name}
              />
              <CardDetail
                label={'Product'}
                value={item?.productdetail?.product_name}
              />
              <CardDetail
                label={'Product Qty'}
                value={getProductQty(
                  item?.productdetail?.shippedproducts,
                  item?.productdetail.id
                )}
              />
              <CardDetail label={'Status'} value={item?.status} />
              <CardDetail label={'Created At'} value={Date(item?.created_at)} />
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default Started
