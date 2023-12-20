import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './customModal.style'
import { selectView, toggleModal } from '../../../features/modal/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'expo-router'
import { logOut } from '../../../features/data/dataSlice'

const CustomModal = () => {
  const navigate = useNavigation()
  const showModal = useSelector(selectView)
  const dispatch = useDispatch()
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        dispatch(toggleModal())
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Are You Sure?</Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => dispatch(toggleModal())}
              style={[styles.declineBtn, styles.btn]}
            >
              <Text style={styles.textStyle}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigate.goBack()
                dispatch(logOut())
                dispatch(toggleModal())
              }}
              style={[styles.acceptBtn, styles.btn]}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default CustomModal
