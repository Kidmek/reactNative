import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './screenheader.style'
import { SIZES } from '../../../constants'

const CustomTabs = ({ data, setActiveType, activeType }) => {
  return (
    <View style={styles.tabsContainer}>
      <FlatList
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
            <Text style={styles.tabText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default CustomTabs
