import React from 'react'
import SingleCard from '../../common/cards/single/SingleCard'
// import styles from '../../common/styles/warehouse.style'
import styles from '../../common/styles/common.style'
import { defaultStyles } from '../../common/styles/Styles'
import { Image, Text, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { mSQUARE } from '../../../constants/strings'

const StorageTypeCard = ({ width, item }) => {
  return (
    <SingleCard
      navigate={true}
      page={{
        name: 'details',
        screen: 'storage',
        params: { name: item?.storage_name, id: item?.id },
      }}
    >
      <Carousel
        loop={true}
        height={width / 2}
        width={width}
        data={item?.mappingdetail?.images}
        scrollAnimationDuration={1000}
        autoPlayInterval={2500}
        renderItem={({ item: image }) => (
          <Image
            style={{ ...defaultStyles.image, alignSelf: 'center' }}
            resizeMode='cover'
            source={{ uri: image?.images }}
          />
        )}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
      />

      <View style={styles.textContainer}>
        <Text style={styles.name}>{item?.mappingdetail?.storage_name} </Text>
        <Text style={styles.type}>
          Available Space : {item?.available_space} {mSQUARE}
        </Text>
        <Text style={styles.type}>
          Total Space : {item?.space} {mSQUARE}
        </Text>
        <Text style={styles.type}>
          Temprature : {item?.maxtemp} - {item?.mintemp} {item?.tempunit}
        </Text>
      </View>
    </SingleCard>
  )
}

export default StorageTypeCard
