import React, { useState } from 'react'
import { View, Text, FlatList, ScrollView, Pressable } from 'react-native'

import styles from './welcome.style'
import allStyles from '../started/started.style'
import { TextInput } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native'
import { SIZES, icons } from '../../../constants'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../../features/data/dataSlice'
import { shipmentTypes } from '../../../constants/strings'
import Started from '../started/Started'
import { useNavigation } from 'expo-router'
import Search from '../../common/search/Search'

const ShipmentWelcome = () => {
  const [searchQuery, setSearchQuery] = useState()
  const navigation = useNavigation()

  const [activeType, setActiveType] = useState(shipmentTypes[0])
  const fetching = useSelector(selectIsFetching)

  const body = () => {
    switch (activeType) {
      case shipmentTypes[0]:
        return <Started fetching={fetching} type={'started'} />
      case shipmentTypes[1]:
        return <Started fetching={fetching} type={'completed'} />
      case shipmentTypes[2]:
        return <Started fetching={fetching} type={'progress'} />
      case shipmentTypes[3]:
        return <Started fetching={fetching} type={'canceled'} />
      case shipmentTypes[4]:
        return <Started fetching={fetching} type={'returned'} />
    }
  }
  return (
    <ScrollView>
      <View style={styles.welcomeContainer}>
        <View>
          <Text style={styles.userName}>Hello Adrian</Text>
          <Text style={styles.welcomeMessage}>Find Your Perfect Shipment</Text>
        </View>

        <View style={styles.shipmentHeader}>
          <TouchableOpacity
            style={styles.shipmentHeaderWrapper}
            onPress={() => {
              navigation.navigate('details', {
                screen: 'transportations',
              })
            }}
          >
            <Feather size={30} name='truck' />
            <View style={allStyles.textContainer}>
              <Text style={allStyles.name}>0</Text>
              <Text style={allStyles.name}>Transportaions</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shipmentHeaderWrapper}
            onPress={() => {
              navigation.navigate('details', {
                screen: 'shipment_terms',
              })
            }}
          >
            <AntDesign size={30} name='copy1' />
            <View style={allStyles.textContainer}>
              <Text style={allStyles.name}>0</Text>
              <Text style={allStyles.name}>Shipment Process (Terms)</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Search
          onSearch={() => {}}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        <View style={styles.tabsContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={shipmentTypes}
            horizontal
            keyExtractor={(item) => item}
            contentContainerStyle={{ columnGap: SIZES.small }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tab(activeType, item)}
                onPress={() => {
                  setActiveType(item)
                }}
              >
                <Text style={styles.tabText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      {body()}
    </ScrollView>
  )
}

export default ShipmentWelcome
