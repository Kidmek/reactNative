import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React from 'react'
import styles from './screenheader.style'
import { COLORS, SIZES } from '../../../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { useRef } from 'react'
import { useState } from 'react'

const CustomTabs = ({ data, setActiveType, activeType, iconData }) => {
  const scrollRef = useRef()
  const itemsRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  const selectCategory = (index) => {
    const selected = itemsRef.current[index]
    setActiveIndex(index)
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true })
    })
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setActiveType(data[index])
  }
  return (
    <View style={styles.tabsContainer}>
      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIZES.xLarge,
          gap: SIZES.xxLarge,
          flexGrow: 1,
        }}
      >
        {data.map((item, index) => (
          <TouchableOpacity
            ref={(el) => (itemsRef.current[index] = el)}
            key={index}
            style={styles.categoriesBtn(activeIndex === index)}
            onPress={() => selectCategory(index)}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-around',
                flex: 1,
                gap: SIZES.small,
              }}
            >
              {iconData && iconData[index] ? (
                iconData[index](
                  SIZES.welcomeTabIcons,
                  activeType === item ? COLORS.secondary : COLORS.gray
                )
              ) : (
                <MaterialCommunityIcons
                  name='warehouse'
                  size={SIZES.welcomeTabIcons}
                  color={activeType === item ? COLORS.secondary : COLORS.gray}
                />
              )}

              <Text style={styles.categoryText(activeIndex === index)}>
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
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
            <MaterialCommunityIcons
              name='warehouse'
              size={SIZES.welcomeTabIcons}
              color={activeType === item ? COLORS.secondary : COLORS.gray}
            />

            <Text style={styles.tabText(activeType, item)}>{item}</Text>
          </TouchableOpacity>
        )} */}
      {/* /> */}
    </View>
  )
}

export default CustomTabs
