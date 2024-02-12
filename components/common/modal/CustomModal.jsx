import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './customModal.style'
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
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        if (setVisible) {
          setVisible(false)
        }
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{title ?? 'Are You Sure?'}</Text>
          {setInput && (
            <Input
              label={"What's the reason for the decline ?"}
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
