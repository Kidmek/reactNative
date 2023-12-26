import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { COLORS, SIZES } from '../../../constants'
import { getAllProducts } from '../../../api/product/product'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import { currencyFormat } from '../../common/utils'
import Checkbox from 'expo-checkbox'

const All = ({ refresh, wizard, checked, setChecked, data }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [products, setProducts] = useState()
  useEffect(() => {
    if (!wizard) {
      getAllProducts(null, dispatch, setProducts, toast)
    }
  }, [refresh])

  useEffect(() => {
    if (data && wizard) {
      setProducts(data)
    }
  }, [data])

  return wizard && !products ? (
    <ActivityIndicator color={COLORS.primary} size={SIZES.xxLarge} />
  ) : (
    <View style={styles.container}>
      {!wizard && (
        <AddNew
          title={'New Product'}
          page={{
            name: 'new',
            screen: 'product',
          }}
        />
      )}

      {products?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            page={{
              name: 'details',
              screen: 'product',
              params: { id: item?.id },
            }}
            navigate={!wizard}
            isOnlyText={true}
            onClick={() => {
              if (setChecked) {
                setChecked(item?.id)
              }
            }}
          >
            <View style={styles.textContainer}>
              <View style={styles.wizCheckerHeader}>
                <Text style={styles.name} numberOfLines={1}>
                  {item?.product_name}
                </Text>
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
              <Text style={styles.jobName}>
                {item?.ProductTypeDetail?.product_type_name}
              </Text>
              <Text style={styles.type}>
                {item?.catagorydetail?.category_name}
              </Text>
              <Text style={styles.type}>{item?.quantity}</Text>
              <Text style={styles.type}>{item?.userdetail?.first_name}</Text>
              <Text style={styles.type}>
                {currencyFormat(item?.price ?? '0') + ' ETB'}
              </Text>
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default All
