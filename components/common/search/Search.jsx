import { View, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './search.style'
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'

const Search = ({ onSearch, setSearchQuery, searchQuery, inner }) => {
  const navigation = useNavigation()
  return (
    <>
      <View style={{ ...styles.searchContainer, marginTop: inner ? 0 : '' }}>
        <View style={styles.searchWrapper}>
          <Ionicons name='search' size={24} />
          <TextInput
            multiline
            numberOfLines={2.5}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={(e) => {
              setSearchQuery(e)
            }}
            placeholder='What Are You Looking For?'
          />
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            navigation.navigate('(modals)/filter')
          }}
        >
          <SimpleLineIcons name='equalizer' size={22} color='black' />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Search
