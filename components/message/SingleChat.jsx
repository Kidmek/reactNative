import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import messageStyles from './message.style'
import { router, useNavigation } from 'expo-router'
import { SIZES } from '../../constants'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'

const SingleChat = ({ conversation, data }) => {
  const navigation = useNavigation()
  const otherUser = conversation?.users?.filter(
    (u) => u?.email != data?.email
  )?.[0]
  // const [otherUser, setOtherUser] = useState();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('details', {
          screen: 'conversation',
          params: {
            new: false,
            conversation,
            otherUser,
          },
        })
      }}
    >
      <View
        style={messageStyles.messageWrapper(
          conversation?.last_sender?.email == data?.email || conversation?.seen
        )}
      >
        <Image
          source={
            conversation?.ProfilePicture
              ? {
                  uri: conversation?.ProfilePicture,
                }
              : require('../../assets/images/avatar.png')
          }
          style={{ width: 70, height: 70, borderRadius: 400 / 2 }}
        />
        <View style={messageStyles.textWrapper}>
          <Text style={{ ...messageStyles.name, fontSize: SIZES.medium }}>
            {otherUser?.first_name + ' ' + otherUser?.last_name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SIZES.small,
            }}
          >
            {conversation?.last_sender?.email == data?.email && (
              <Ionicons name='return-down-forward' size={SIZES.medium} />
            )}
            <Text style={messageStyles.type}>{conversation?.last_message}</Text>
          </View>

          <Text
            style={{
              ...messageStyles.type,
              fontSize: SIZES.small,
              alignSelf: 'flex-start',
            }}
          >
            {moment
              .utc(conversation?.sent_at)
              .local()
              .startOf('seconds')
              .fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SingleChat
