import { View, Text, Image } from 'react-native'
import React from 'react'
import SingleCard from '../../common/cards/single/SingleCard'
import { customerStyles } from '../../staffs/Customers/customers.style'
import styles from '../../common/styles/common.style'
import { COLORS } from '../../../constants'
const SingleDriver = ({ driver }) => {
  return (
    <SingleCard isOnlyText={true}>
      <View style={customerStyles.container}>
        <Image
          source={
            driver?.ProfilePicture
              ? {
                  uri: driver?.ProfilePicture,
                }
              : require('../../../assets/images/avatar.png')
          }
          style={{ width: 70, height: 70, borderRadius: 400 / 2 }}
        />
        <View style={customerStyles.textContainer}>
          <Text style={styles.name}>
            {driver?.first_name + ' ' + driver?.last_name}
          </Text>
          {/* <Text style={styles.middle}>{driver?.phone}</Text> */}
          <Text style={styles.type}>{driver?.email}</Text>
          <Text
            style={customerStyles.popUpText(
              driver?.is_active ? COLORS.green : COLORS.gray2
            )}
          >
            {driver?.is_active ? 'Active' : 'Initialized'}
          </Text>
        </View>
      </View>
    </SingleCard>
  )
}

export default SingleDriver
