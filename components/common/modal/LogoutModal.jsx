import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './customModal.style'
import { selectView, toggleModal } from '../../../features/modal/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { router, useNavigation } from 'expo-router'
import { logOut } from '../../../features/data/dataSlice'

const LogoutModal = ({ onSuccess }) => {
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
        <View style={{ ...styles.modalView, ...styles.logoutContainer }}>
          <View style={styles.textContainer}>
            {/* <Ionicons
              name='close-circle-outline'
              size={SIZES.xxLarge * 1.5}
              color={COLORS.black}
            /> */}
            <Text style={styles.modalHeader}>Logout</Text>

            <Text style={styles.logoutText}>
              {'Are you sure you want to log out?'}
            </Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                dispatch(toggleModal())
              }}
              style={[styles.neutralBtn, styles.btn]}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push('/')
                dispatch(logOut())
                dispatch(toggleModal())
                onSuccess()
              }}
              style={[styles.declineBtn, styles.btn]}
            >
              <Text style={styles.textStyle}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default LogoutModal
