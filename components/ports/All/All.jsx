import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../constants'
import { store } from '../../../store'
import styles from '../../common/styles/common.style'
import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { useEffect } from 'react'
import CardDetail from '../../common/detail/CardDetail'
import { getPorts } from '../../../api/shipment/shipment'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import PortSVG from '../../../assets/icons/ports'
import Checkbox from 'expo-checkbox'

const All = ({
  wizard,
  checked,
  setChecked,
  fetching,
  refresh,
  setPortName,
}) => {
  const iconSize = 30

  const dispatch = store.dispatch

  const toast = useToast()

  const [ports, setPorts] = useState()
  const fetch = () => {
    getPorts(null, dispatch, setPorts, toast)
  }

  useEffect(() => {
    fetch()
  }, [refresh])
  return wizard && !ports ? (
    <ActivityIndicator color={COLORS.primary} size={SIZES.xxLarge} />
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
              if (setChecked) {
                if (setPortName) {
                  setPortName(item?.name)
                }
                setChecked(item.id)
              }
            }}
          >
            <View style={{ ...styles.onlyTextContainer, borderWidth: 0 }}>
              {wizard && (
                <View style={styles.wizCheckerHeader}>
                  <View>
                    <PortSVG color={COLORS.primary} size={iconSize} />
                    <Text style={styles.name}>{item?.name}</Text>
                  </View>
                  <Checkbox
                    color={COLORS.primary}
                    value={checked === item.id}
                    onValueChange={(value) => {
                      if (value) {
                        if (setPortName) {
                          setPortName(item?.name)
                        }
                        setChecked(item.id)
                      }
                    }}
                  />
                </View>
              )}

              {!wizard ? (
                <View>
                  <Text style={styles.name}>{item?.name}</Text>
                  <Text style={styles.name}>
                    {item?.country} , {item?.city}
                  </Text>
                </View>
              ) : (
                <>
                  <CardDetail label={'Country'} value={item?.country} />
                  <CardDetail label={'City'} value={item?.city} />
                </>
              )}

              {!wizard && <Text style={styles.type}>{item?.discription}</Text>}
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default All
