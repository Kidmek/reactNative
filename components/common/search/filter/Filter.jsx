import styles from './filter.style'
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from 'expo-router'
import { Modal } from 'react-native'
import { Pressable } from 'react-native'
import { Dimensions } from 'react-native'

const Filter = ({ showFilter, setShowFilter }) => {
  const { width, height } = Dimensions.get('screen')

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={showFilter}
      onRequestClose={() => {
        setShowFilter(false)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Filters</Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => setShowFilter(false)}
              style={[styles.declineBtn, styles.btn]}
            >
              <Text style={styles.textStyle}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Filter
