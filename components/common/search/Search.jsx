import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './search.style'
import { icons } from '../../../constants'

const Search = ({ onSearch, setSearchQuery, searchQuery, inner }) => {
  return (
    <View style={{ ...styles.searchContainer, marginTop: inner ? 0 : '' }}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={(e) => {
            setSearchQuery(e)
          }}
          placeholder='What Are You Looking For?'
        />
      </View>
      <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
        <Image source={icons.search} style={styles.searchBtnImage} />
      </TouchableOpacity>
    </View>
  )
}

export default Search
