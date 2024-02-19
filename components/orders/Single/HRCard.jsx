import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import styles from '../../common/styles/common.style'
import SingleCard from '../../common/cards/single/SingleCard'

const HRCard = ({ item }) => {
  return (
    <SingleCard
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
          <Text style={styles.name}>{item?.resource?.name}</Text>
          <Text style={styles.middle}>{item?.number} Persons</Text>
        </View>
      </View>
    </SingleCard>
  )
}

export default HRCard
