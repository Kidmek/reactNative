import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from '../common/styles/warehouse.style'
import notificationStyles from './notification.style'
import InfoSVG from '../../assets/icons/info'
import { COLORS, SIZES } from '../../constants'
import moment from 'moment'

const Notification = () => {
  const data = [
    {
      seen: false,
      createdAt: new Date(),
      content: 'Warehouse workers warehouse created succesfully',
    },
    {
      seen: false,
      createdAt: new Date(),
      content:
        'insurance order for warehouse warehouse03 was paid by customer please confirm',
    },
    {
      seen: false,
      createdAt: new Date(),
      content: 'warehouse03 insurance order created succesfully',
    },
    {
      seen: false,
      createdAt: new Date(),
      content:
        'insurance order for warehouse warehouse03 was paid by customer please confirm',
    },
    {
      seen: false,
      createdAt: new Date(),
      content:
        'insurance order for mapping Pharmaceutical was accepted by dawitgotech@gmail.com',
    },
    {
      seen: false,
      createdAt: new Date(),
      content:
        'insurance order for storage type Pharmaceutical in warehouse warehouse02 was paid by customer please confirm',
    },
  ]
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingVertical: SIZES.medium,
      }}
    >
      {data.map((item, index) => {
        return (
          <View
            key={index}
            style={notificationStyles.notificationWrapper(item.seen)}
          >
            <InfoSVG size={25} color={COLORS.primary} />
            <View style={notificationStyles.textWrapper}>
              <Text style={notificationStyles.content(item.seen)}>
                {item.content}
              </Text>
              <Text style={notificationStyles.date}>
                {moment
                  .utc(item.createdAt)
                  .local()
                  .startOf('seconds')
                  .fromNow()}
              </Text>
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

export default Notification
