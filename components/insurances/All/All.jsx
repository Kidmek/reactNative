import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { COLORS } from '../../../constants'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { useEffect } from 'react'
import CardDetail from '../../common/detail/CardDetail'
import { getAllInsurance } from '../../../api/product/insurance'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const All = ({ fetching }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [insurances, setInsurances] = useState()
  useEffect(() => {
    getAllInsurance(null, dispatch, setInsurances, toast)
  }, [])
  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <AddNew
        title={'New Insurace'}
        page={{
          name: 'details',
          screen: 'insurance_options',
          params: {
            choose: true,
          },
        }}
      />

      {insurances?.results?.map((item, index) => {
        return (
          <SingleCard key={index} isOnlyText={true}>
            <View style={{ ...styles.onlyTextContainer, borderWidth: 0 }}>
              <CardDetail
                label={'Insurance Agent'}
                value={item?.agentdetail?.first_name}
              />
              <CardDetail
                label={'Property'}
                value={item?.productdetail?.product_name}
              />

              <CardDetail label={'Status'} value={item?.status} />
              <CardDetail
                label={'Created Date'}
                value={Date(item?.created_at)}
              />
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default All
