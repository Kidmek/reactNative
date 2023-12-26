import { View, Text } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { store } from '../../../store'
import { FontAwesome5 } from '@expo/vector-icons'
import { useToast } from 'react-native-toast-notifications'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllGroups } from '../../../api/users'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'

const All = ({ fetching, refresh }) => {
  const dispatch = store.dispatch
  const toast = useToast()
  const [groups, setGroups] = useState()

  useEffect(() => {
    getAllGroups(null, dispatch, setGroups, toast)
  }, [refresh])
  return (
    <View style={styles.container}>
      <AddNew
        title={'New Group'}
        page={{
          name: 'new',
          screen: 'group',
        }}
      />

      {groups?.results?.map((item, index) => {
        return (
          <SingleCard
            key={index}
            page={{
              name: 'details',
              screen: 'group',
              params: { id: item.id, name: item?.name },
            }}
            isOnlyText={true}
          >
            <View
              style={{
                ...styles.onlyTextContainer,
                borderWidth: 0,
                flexDirection: 'row',
              }}
            >
              <FontAwesome5 name='users' size={20} color={'black'} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item?.name}</Text>
              </View>
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default All
