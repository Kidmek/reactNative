import { View, Text, Image, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { store } from '../../../store'
import styles from '../../common/styles/common.style'
import { COLORS } from '../../../constants'
import { getOfficeEquipments } from '../../../api/office/office'
import AddNew from '../../common/header/AddNew'
import SingleCard from '../../common/cards/single/SingleCard'
import Carousel from 'react-native-reanimated-carousel'

const OfficeEquipments = ({ fetching }) => {
  const width = Dimensions.get('window').width

  const dispatch = store.dispatch
  const toast = useToast()

  const [officeEquipments, setOfficeEquipments] = useState()
  useEffect(() => {
    getOfficeEquipments(null, dispatch, setOfficeEquipments, toast)
  }, [])

  return fetching ? (
    <ActivityIndicator size={'xxLarge'} color={COLORS.primary} />
  ) : (
    <View style={styles.container}>
      <AddNew
        title={'New Office Equipment'}
        page={{
          name: 'new',
          screen: 'equipment',
        }}
      />

      {officeEquipments?.results?.map((item, index) => {
        return (
          <SingleCard key={index}>
            <Carousel
              loop={false}
              height={width / 2}
              width={width}
              pagingEnabled={true}
              data={[item?.image]}
              onSnapToItem={(index) => {}}
              scrollAnimationDuration={1000}
              renderItem={({ item: image }) => (
                <Image
                  style={{ ...styles.image, alignSelf: 'center' }}
                  source={{ uri: image }}
                />
              )}
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
            />

            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {item?.name}
              </Text>
              <Text style={styles.type}>{item?.equipment_type}</Text>
              <Text style={styles.type}>${item?.price}</Text>
            </View>
          </SingleCard>
        )
      })}
    </View>
  )
}

export default OfficeEquipments
