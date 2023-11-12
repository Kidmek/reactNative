import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { COLORS } from '../../../constants'
import { getProductTypes } from '../../../api/product/product'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const Types = ({ fetching }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [productTypes, setProductTypes] = useState()
  useEffect(() => {
    getProductTypes(null, dispatch, setProductTypes, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <AddNew
        title={'New Product Type'}
        page={{
          name: 'new',
          screen: 'product_type',
        }}
      />

      <View style={styles.listContainer}>
        {productTypes?.results?.map((item, index) => {
          return (
            <SingleCard
              key={index}
              page={{
                name: 'details',
                screen: 'product_type',
                params: { name: item?.storage_name, id: item?.id },
              }}
            >
              {/* <AntDesign name='storage' size={40} color={'black'} /> */}
              <View style={styles.textContainer}>
                <Text style={styles.name} numberOfLines={1}>
                  {item?.product_type_name}
                </Text>
                <Text style={styles.type}>
                  <Text style={styles.label}>Created At: </Text>
                  {Date(item?.created_at)}
                </Text>
              </View>
            </SingleCard>
          )
        })}
      </View>
    </View>
  )
}

export default Types
