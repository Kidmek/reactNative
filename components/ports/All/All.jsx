import { View, ActivityIndicator, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../../../constants'
import { store } from '../../../store'
import styles from '../../common/styles/common.style'
import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { useEffect } from 'react'
import CardDetail from '../../common/detail/CardDetail'
import { getPorts } from '../../../api/shipment/shipment'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import PortSVG from '../../../assets/icons/ports'
import Checkbox from 'expo-checkbox'

const All = ({ wizard, checked, setChecked }) => {
  const iconSize = 30

  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)

  const toast = useToast()

  const [ports, setPorts] = useState()

  useEffect(() => {
    getPorts(null, dispatch, setPorts, toast)
  }, [])
  return fetching ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size={'xxLarge'}
      color={COLORS.primary}
    />
  ) : (
    <View style={styles.container}>
      {wizard ? (
        <Text style={styles.wizTitle}>Choose Port To Transit</Text>
      ) : (
        <AddNew
          title={'New Port'}
          page={{
            name: 'new',
            screen: 'port',
          }}
        />
      )}

      {ports?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            navigate={!wizard}
            isOnlyText={true}
            onClick={() => {
              if (setChecked) setChecked(item.id)
            }}
          >
            <View style={{ ...styles.onlyTextContainer, borderWidth: 0 }}>
              {wizard && (
                <View style={styles.wizCheckerHeader}>
                  <View>
                    <PortSVG color={COLORS.primary} size={iconSize} />
                    <Text style={styles.name}>{'Port ' + item?.country}</Text>
                  </View>
                  <Checkbox
                    color={COLORS.primary}
                    value={checked === item.id}
                    onValueChange={(value) => {
                      if (value) {
                        setChecked(item.id)
                      }
                    }}
                  />
                </View>
              )}

              {!wizard && (
                <CardDetail label={'Country'} value={item?.country} />
              )}

              <CardDetail label={'City'} value={item?.city} />
              <CardDetail label={'Port Name'} value={item?.name} />
              {!wizard && (
                <CardDetail label={'Description'} value={item?.discription} />
              )}
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default All
