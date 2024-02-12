import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import messageStyles from './message.style'
import { useNavigation } from 'expo-router'
import { SIZES } from '../../constants'
const SingleUser = ({ user }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('details', {
          screen: 'conversation',
          params: {
            new: true,
            otherUser: user,
          },
        })
      }}
    >
      <View style={messageStyles.messageWrapper(true)}>
        <Image
          source={
            user?.ProfilePicture
              ? {
                  uri: user?.ProfilePicture,
                }
              : require('../../assets/images/avatar.png')
          }
          style={{ width: 50, height: 50, borderRadius: 400 / 2 }}
        />
        <View style={messageStyles.textWrapper}>
          <Text style={{ ...messageStyles.name, fontSize: SIZES.medium }}>
            {user?.first_name + ' ' + user?.last_name}
          </Text>
          <Text
            style={{
              ...messageStyles.type,
              fontSize: SIZES.small,
            }}
          >
            {user?.email}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SingleUser
