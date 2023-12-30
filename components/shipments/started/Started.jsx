import { View } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { getShipments } from '../../../api/shipment/shipment'
import CardDetail from '../../common/detail/CardDetail'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const Started = ({ fetching, type, refresh }) => {
  const dispatch = store.dispatch
  const toast = useToast()
  const [shipments, setShipments] = useState()

  const getProductQty = (shipments, productId) => {
    const product = shipments?.filter((ship) => ship.product == productId)
    if (product?.length) {
      return product[0].productqty
    } else {
      return ''
    }
  }

  useEffect(() => {
    getShipments(type, dispatch, setShipments, toast)
  }, [type, refresh])

  return (
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
            isOnlyText={true}
            page={{
              name: 'details',
              screen: 'shipment',
              params: {
                id: item?.id,
              },
            }}
          >
            <View style={{ ...styles.onlyTextContainer, borderWidth: 0 }}>
              <CardDetail
                label={'Shipment Method'}
                value={item?.shipmenttypedetail?.name}
              />
              {/* <CardDetail
                label={'Customer'}
                value={item?.productdetail?.userdetail?.first_name}
              /> */}
              <CardDetail
                label={'Transportation'}
                value={item?.vehicledetail?.type}
              />
              <CardDetail
                label={'Product'}
                value={item?.productdetail?.product_name}
              />
              <CardDetail label={'Product Qty'} value={item?.productqty} />
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
