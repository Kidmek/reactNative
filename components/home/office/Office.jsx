import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import { COLORS } from '../../../constants'
import { getOffices } from '../../../api/office/office'
import { mSQUARE } from '../../../constants/strings'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const Office = ({ fetching }) => {
  const dispatch = store.dispatch
  const toast = useToast()

  const [offices, setOffices] = useState()
  useEffect(() => {
    getOffices(null, dispatch, setOffices, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <AddNew
        title={'New Office'}
        page={{
          name: 'new',
          screen: 'office',
        }}
      />

      {offices?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            page={{
              name: 'details',
              screen: 'office',
              params: { id: item.id, name: item.name },
            }}
            isOnlyText={true}
          >
            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.name}
              </Text>
              <Text style={styles.type}>{item?.space + ' ' + mSQUARE} </Text>
              <Text style={styles.type}>{item?.price}</Text>
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default Office
