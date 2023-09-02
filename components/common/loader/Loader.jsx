import React from 'react'
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native'

import styles from './loader.style'
import { useSelector } from 'react-redux'
import { selectIsLoading } from '../../../features/data/dataSlice'

const Loader = () => {
  const loading = useSelector(selectIsLoading)

  return (
    <Modal transparent={true} animationType={'none'} visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={true}
            color='#000000'
            size='large'
            style={styles.activityIndicator}
          />
        </View>
      </View>
    </Modal>
  )
}

export default Loader
