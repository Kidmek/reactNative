import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Share,
  StyleSheet,
} from 'react-native'
import React, { useState } from 'react'

import styles from '../../common/styles/warehouse.style'
import innerStyles from '../../common/styles/withImages.style'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { COLORS, FONT, SIZES } from '../../../constants'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useLayoutEffect } from 'react'
import {
  getManagedWarehouseDetails,
  getWarehouseDetails,
} from '../../../api/warehouse/warehouse'
import { store } from '../../../store'
import { useToast } from 'react-native-toast-notifications'
import MapView, { Marker } from 'react-native-maps'
import { selectIsFetching, setFetching } from '../../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import Search from '../../../components/common/search/Search'
import { DataTable } from 'react-native-paper'
import { mSQUARE } from '../../../constants/strings'
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'
import { defaultStyles } from '../../../components/common/styles/Styles'
import { currencyFormat } from '../../../components/common/utils'
import Carousel from 'react-native-reanimated-carousel'
import wizard from '../../../app/home/wizard'
import CardDetail from '../../common/detail/CardDetail'
import { getMappedStorageDetails } from '../../../api/storage/storage'

const { width } = Dimensions.get('window')
const IMG_HEIGHT = 300

const SingleStorageType = ({ params, wizard, setData }) => {
  const navigation = useNavigation()
  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const toast = useToast()
  const [storage, setStorage] = useState()
  const [selectedImg, setSelectedImg] = useState(0)
  const scrollRef = useAnimatedRef()

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      })
    } catch (err) {
      console.log(err)
    }
  }

  useLayoutEffect(() => {
    if (!wizard) {
      navigation.setOptions({
        headerTitle: '',
        headerTransparent: true,

        headerBackground: () => (
          <Animated.View
            style={[headerAnimatedStyle, innerStyles.header]}
          ></Animated.View>
        ),
        headerRight: () => (
          <View style={innerStyles.bar}>
            <TouchableOpacity
              style={innerStyles.roundButton}
              onPress={shareListing}
            >
              <Ionicons name='share-outline' size={22} color={'#000'} />
            </TouchableOpacity>
            <TouchableOpacity style={innerStyles.roundButton}>
              <Ionicons name='heart-outline' size={22} color={'#000'} />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity
            style={innerStyles.roundButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name='chevron-back' size={24} color={'#000'} />
          </TouchableOpacity>
        ),
      })
    }
  }, [])

  const scrollOffset = useScrollViewOffset(scrollRef)

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    }
  })

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    }
  }, [])

  useEffect(() => {
    getMappedStorageDetails(params?.id, dispatch, setStorage, toast)
  }, [])

  useEffect(() => {
    if (storage && setData) {
      setData(storage)
    }
  }, [storage])

  return fetching ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size={SIZES.xxLarge}
      color={COLORS.primary}
    />
  ) : (
    <View style={innerStyles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: !wizard ? 100 : 0 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Carousel
          loop={false}
          height={IMG_HEIGHT}
          width={width}
          pagingEnabled={true}
          data={storage?.warehouse_storage_type?.storagetypeimages}
          onSnapToItem={(index) => {}}
          scrollAnimationDuration={1000}
          renderItem={({ item: image }) => (
            <Animated.Image
              source={{ uri: image?.images }}
              style={[innerStyles.image(IMG_HEIGHT, width), imageAnimatedStyle]}
              resizeMode='cover'
            />
          )}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
        />

        {!wizard ? (
          <View style={innerStyles.infoContainer}>
            <Text style={innerStyles.name}>
              {storage?.warehousedetail?.storage_name}
            </Text>
            <Text style={innerStyles.location}>
              {storage?.warehousedetail?.region},
              {storage?.warehousedetail?.city},
              {storage?.warehousedetail?.sub_city}
            </Text>
            <Text style={innerStyles.rooms}>
              {storage?.storage_space} {mSQUARE}
            </Text>

            <View style={innerStyles.divider} />

            <Text style={innerStyles.description}>
              {storage?.warehouse_storage_type?.storage_type_meta}
            </Text>

            <View style={innerStyles.divider} />

            {/*  */}

            {/* {storage?.lat && storage?.lng && (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: storage?.lat,
                  longitude: storage?.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
            showsUserLocation

              >
                <Marker
                  pinColor='red'
                  coordinate={{
                    latitude: storage?.lat,
                    longitude: storage?.lng,
                  }}
                />
              </MapView>
            )} */}
          </View>
        ) : (
          <View style={innerStyles.infoContainer}>
            <CardDetail
              label={'Total Space'}
              value={storage?.storage_space}
              isSpace
            />
            <CardDetail
              label={'Available Space'}
              value={storage?.available_space}
              isSpace
            />
            <CardDetail label={'Height'} value={storage?.height + 'M'} />
            <CardDetail
              label={'Temprature'}
              value={storage?.mintemp + ' - ' + storage?.maxtemp + 'C'}
            />

            <CardDetail
              label={'Price /' + mSQUARE}
              value={storage?.price_m2}
              isPrice
            />
            <CardDetail
              label={'Total Price'}
              value={storage?.totalprice}
              isPrice
            />
            <CardDetail label={'Terminal'} value={storage?.terminal} />
          </View>
        )}
      </Animated.ScrollView>

      {!wizard && (
        <Animated.View
          style={defaultStyles.footer}
          entering={SlideInDown.delay(200)}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity style={styles.footerText}>
              <Text style={styles.footerPrice}>
                {currencyFormat(storage?.full_price ?? 0)}
              </Text>
              <Text>Birr</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}
            >
              <Text style={defaultStyles.btnText}>Order</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  )
}

export default SingleStorageType
