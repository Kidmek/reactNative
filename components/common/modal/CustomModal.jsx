import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './customModal.style'
import { selectView, toggleModal } from '../../../features/modal/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'expo-router'
import { logOut } from '../../../features/data/dataSlice'
import Input from '../input/Input'
import { MULTI } from '../../../constants/strings'

const CustomModal = ({
  visible,
  setVisible,
  onSuccess,
  input,
  setInput,
  title,
}) => {
  const navigate = useNavigation()
  const showModal = useSelector(selectView)
  const dispatch = useDispatch()
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible !== undefined ? visible : showModal}
      onRequestClose={() => {
        if (setVisible) {
          setVisible(false)
        } else {
          dispatch(toggleModal())
        }
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title ?? 'Are You Sure?'}</Text>
          {setInput && (
            <Input
              label={'Share us the reason why you want to decline this order ?'}
              setState={setInput}
              state={input}
              type={MULTI}
            />
          )}
          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                if (setVisible) {
                  setVisible(false)
                } else {
                  dispatch(toggleModal())
                }
              }}
              style={[styles.declineBtn, styles.btn]}
            >
              <Text style={styles.textStyle}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (onSuccess) {
                  onSuccess()
                  setVisible(false)
                } else {
                  navigate.goBack()
                  dispatch(logOut())
                  dispatch(toggleModal())
                }
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
