import { View, Text } from 'react-native'
import React from 'react'
import messageStyles from './message.style'
import moment from 'moment'
import { SIZES } from '../../constants'

const SingleMessage = ({ message, isOwn }) => {
  return (
    <View style={{ marginBottom: SIZES.medium }}>
      <View style={messageStyles.singleMsg(isOwn)}>
        <Text style={{ ...messageStyles.name, fontSize: SIZES.medium }}>
          {message?.message}
        </Text>
        {/* <View style={messageStyles.singleMsgEdge} /> */}
        {/* <View style={messageStyles.singleMsgTopEdge} /> */}
      </View>

      <Text
        style={{
          ...messageStyles.type,
          alignSelf: isOwn ? 'flex-start' : 'flex-end',
        }}
      >
        {moment.utc(message?.sent_at).local().startOf('seconds').fromNow()}
      </Text>
    </View>
  )
}

export default SingleMessage
