import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from '../common/styles/warehouse.style'
import notificationStyles from './notification.style'
import InfoSVG from '../../assets/icons/info'
import { COLORS, SIZES } from '../../constants'
import moment from 'moment'
import CustomTabs from '../common/header/CustomTabs'
import { CUSTOMS, SHIPMNET, SPACE } from '../../constants/strings'
import ShipmentSVG from '../../assets/icons/shipment'
import SpaceSVG from '../../assets/icons/space'
import TransitSVG from '../../assets/icons/transit'

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

  const [activeType, setActiveType] = useState()
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingVertical: SIZES.medium,
      }}
    >
      <CustomTabs
        data={[
          SPACE.toUpperCase(),
          SHIPMNET.toUpperCase(),
          CUSTOMS.toUpperCase(),
        ]}
        setActiveType={setActiveType}
        activeType={activeType}
        iconData={[
          (size, color) => <SpaceSVG color={color} size={size} />,
          (size, color) => <ShipmentSVG color={color} size={size} />,

          (size, color) => <TransitSVG color={color} size={size} />,
        ]}
      />

      <View
        style={{
          paddingTop: SIZES.medium,
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
      </View>
    </ScrollView>
  )
}

export default Notification
