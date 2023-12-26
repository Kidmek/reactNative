import { View, ActivityIndicator, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../../../constants'
import { store } from '../../../store'
import styles from '../../common/styles/common.style'
import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { useEffect } from 'react'
import CardDetail from '../../common/detail/CardDetail'
import { getPortAgents } from '../../../api/shipment/shipment'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import Checkbox from 'expo-checkbox'
import { AntDesign } from '@expo/vector-icons'
const Agent = ({ portId, wizard, checked, setChecked }) => {
  const iconSize = 30

  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)

  const toast = useToast()

  const [agents, setAgents] = useState()

  useEffect(() => {
    getPortAgents(portId, dispatch, setAgents, toast)
  }, [portId])

  return fetching ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size={'xxLarge'}
      color={COLORS.primary}
    />
  ) : (
    <View style={styles.container}>
      {wizard ? (
        <Text style={styles.wizTitle}>
          Choose Transit Agent In {agents?.name ?? ''}
        </Text>
      ) : (
        <AddNew
          title={'New Port'}
          page={{
            name: 'new',
            screen: 'port',
          }}
        />
      )}

      {agents?.transitorlist?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            onClick={() => setChecked(item.id)}
            isOnlyText={true}
          >
            <View style={{ ...styles.onlyTextContainer, borderWidth: 0 }}>
              {wizard && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <View>
                    <AntDesign
                      name='user'
                      color={COLORS.primary}
                      size={iconSize}
                    />
                    <Text style={styles.wizTitle}>{item?.first_name}</Text>
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
              <CardDetail label={'Email'} value={item?.email} />

              <CardDetail
                label={'Business License'}
                value={item?.license}
                download
              />
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default Agent
