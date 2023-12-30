import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import { useEffect } from 'react'
import { getShipmentTypes } from '../../../api/shipment/shipment'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { COLORS } from '../../../constants'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import Checkbox from 'expo-checkbox'

const ShipmentType = ({ wizard, checked, setChecked, data, refresh }) => {
  const params = useLocalSearchParams()
  const dispatch = store.dispatch
  const toast = useToast()
  const [types, setTypes] = useState()
  const fetching = useSelector(selectIsFetching)

  useEffect(() => {
    if (!wizard) {
      getShipmentTypes(null, dispatch, setTypes, toast)
    }
  }, [refresh])

  useEffect(() => {
    if (wizard) {
      setTypes(data)
    }
  }, [data])

  return (
    <ScrollView style={wizard ? {} : styles.welcomeContainer}>
      {!params?.choose && !wizard && (
        <AddNew
          title={'New Shipment Type'}
          page={{
            name: 'new',
            screen: 'shipment_type',
          }}
        />
      )}
      {wizard && (
        <Text style={styles.wizTitle}>
          What Type Of Shipment Would You Like To Make?
        </Text>
      )}

      {types?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            page={
              !params?.choose
                ? {
                    name: 'details',
                    screen: 'warehouse',
                    params: { type: 'Unmanaged', id: item.id },
                  }
                : {
                    name: 'new',
                    screen: 'shipment',
                    params: { type: item?.name, typeId: item?.id },
                  }
            }
            navigate={!wizard}
            isOnlyText={true}
            onClick={() =>
              setChecked({
                id: item?.id,
                type: item.name,
              })
            }
          >
            <View style={styles.textContainer}>
              <View style={styles.wizCheckerHeader}>
                <Text style={styles.name}>{item?.name}</Text>
                {wizard && (
                  <Checkbox
                    color={COLORS.primary}
                    value={checked?.type === item.name}
                    onValueChange={(value) => {
                      if (value) {
                        setChecked({
                          id: item?.id,
                          type: item.name,
                        })
                      }
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  ...styles.type,
                  alignSelf: wizard ? 'flex-start' : 'auto',
                }}
              >
                {item?.description}
              </Text>
              {!params?.choose && !wizard && (
                <Text style={styles.date}>{Date(item?.created_at)}</Text>
              )}
            </View>
          </SingleCard>
        )
      })}
    </ScrollView>
  )
}

export default ShipmentType
