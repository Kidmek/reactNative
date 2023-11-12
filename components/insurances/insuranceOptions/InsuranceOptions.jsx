import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import { COLORS } from '../../../constants'
import { getAllInsuranceTypes } from '../../../api/product/insurance'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
const InsuranceOptions = ({ params }) => {
  const dispatch = store.dispatch
  const toast = useToast()
  const fetching = useSelector(selectIsFetching)
  const [insuranceOptions, setInsuranceOptions] = useState()
  useEffect(() => {
    getAllInsuranceTypes(null, dispatch, setInsuranceOptions, toast)
  }, [])

  return (
    <ScrollView style={styles.container}>
      {!params?.choose && (
        <View style={styles.cardsContainer}>
          <AddNew
            title={'New Insurance Option'}
            page={{
              name: 'new',
              screen: 'insurance_option',
            }}
          />
        </View>
      )}
      {fetching ? (
        <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
      ) : (
        insuranceOptions?.results?.map((item, index) => {
          return (
            <SingleCard
              key={index}
              page={
                params.choose
                  ? {
                      name: 'new',
                      screen: 'insurance',
                      params: { type: item?.name },
                    }
                  : {}
              }
            >
              <View style={styles.textContainer}>
                <Text style={styles.name} numberOfLines={1}>
                  {item?.name}
                </Text>
                <Text style={styles.type}>{item?.description}</Text>
              </View>
            </SingleCard>
          )
        })
      )}
    </ScrollView>
  )
}

export default InsuranceOptions
