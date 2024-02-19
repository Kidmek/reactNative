import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from '../../common/styles/common.style'
import { COLORS, SIZES } from '../../../constants'
import CardDetail from '../../common/detail/CardDetail'
import SingleCard from '../../common/cards/single/SingleCard'
import Carousel from 'react-native-reanimated-carousel'
const OfficeCard = ({ item, width }) => {
  return (
    <View>
      <SingleCard isOnlyText navigate={false} onClick={() => {}}>
        <View style={{ ...styles.textContainer, alignSelf: 'stretch' }}>
          <Text style={{ ...styles.wizTitle, color: COLORS.primary }}>
            {item?.name}
          </Text>
          <View
            style={{
              paddingHorizontal: SIZES.medium,
              marginTop: SIZES.small,
            }}
          >
            <CardDetail label={'Office Space'} value={item?.space} isSpace />
            <CardDetail
              label={'Office Price'}
              value={item?.price + ' Birr / Day'}
            />
          </View>
          <View>
            <View style={styles.divider} />

            <Text style={styles.wizTitle}>{item?.name + ' Equipments'}</Text>
            {item?.equipments?.map((equipment) => {
              return (
                <SingleCard key={equipment.id} navigate={false}>
                  <Carousel
                    loop={false}
                    height={width / 2}
                    width={width}
                    pagingEnabled={true}
                    data={[equipment?.image]}
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
                    <Text style={styles.name}>Name : {equipment?.name}</Text>
                    <Text style={styles.middle}>
                      Equipment Type : {equipment?.equipment_type}
                    </Text>
                    <Text style={styles.type}>
                      Price / Day : {equipment?.price} Birr
                    </Text>
                  </View>

                  <View style={styles.divider} />
                </SingleCard>
              )
            })}
          </View>
        </View>
      </SingleCard>
    </View>
  )
}

export default OfficeCard
