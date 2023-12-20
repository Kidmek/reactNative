// import { View, Text } from 'react-native'
// import React from 'react'
// import { useDispatch } from 'react-redux'
// import { useNavigation } from 'expo-router'
// import { Modal } from 'react-native'
// import { Pressable } from 'react-native'

// import styles from './logout.style'
// import { Dimensions } from 'react-native'

// const Logout = ({ showLogout, setShowLogout }) => {
//   const dispatch = useDispatch()

//   const { width, height } = Dimensions.get('screen')
//   const toggleModal = () => {
//     setShowLogout(false)
//   }

//   const navigation = useNavigation()
//   return (
//     <Modal
//       isVisible={showLogout}
//       deviceWidth={width / 2}
//       deviceHeight={height / 2}
//       //   onModalHide={() => console.warn("hello")}
//       onBackdropPress={() => {
//         setShowLogout(false)
//         dispatch(hideConfirm())
//       }}
//     >
//       <View style={styles.container}>
//         <View style={styles.textWrapper}>
//           <Text style={styles.text}>Are you sure you want to logout?</Text>
//         </View>
//         <View style={styles.btnWrapper}>
//           <Pressable
//             onPress={() => {
//               dispatch(hideConfirm())
//               navigation.navigate('(logout)')
//             }}
//             style={styles.yesBtn}
//           >
//             <Text style={styles.text}>Yes</Text>
//           </Pressable>
//           <Pressable
//             onPress={() => {
//               toggleModal()
//               console.log('No')
//               dispatch(hideConfirm())
//               navigation.goBack()
//             }}
//             style={styles.noBtn}
//           >
//             <Text style={styles.text}>No</Text>
//           </Pressable>
//         </View>
//       </View>
//     </Modal>
//   )
// }

// export default Logout
