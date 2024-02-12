import { View } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { useEffect } from 'react'
import CardDetail from '../../common/detail/CardDetail'
import { getAllInsurance } from '../../../api/product/insurance'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/data/dataSlice'
import { PRODUCT } from '../../../constants/strings'

const All = ({ fetching, refresh }) => {
  const dispatch = store.dispatch
  const toast = useToast()
  const user = useSelector(selectUser)

  const [insurances, setInsurances] = useState()
  useEffect(() => {
    getAllInsurance(null, dispatch, setInsurances, toast)
  }, [refresh])
  return (
    <View style={styles.container}>
      {!(user?.groups?.length > 0) && (
        <AddNew
          title={'New Insurace'}
          page={{
            name: 'new',
            screen: 'insurance',
            params: {
              type: PRODUCT,
              typeId: 1,
            },
          }}
        />
      )}

      {insurances?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            isOnlyText={true}
            page={{
              name: 'details',
              screen: 'insurance',
              params: {
                id: item?.id,
              },
            }}
          >
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
