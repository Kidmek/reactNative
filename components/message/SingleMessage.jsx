import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import messageStyles from './message.style'
import moment from 'moment'
import { FONT, SIZES } from '../../constants'
import { MSG_API } from '../../constants/strings'
import ImageView from 'react-native-image-viewing'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SingleMessage = ({ message, isOwn }) => {
  const [visible, setIsVisible] = useState(false)
  const [index, setIndex] = useState(0)
  return (
    <View style={{ marginBottom: SIZES.medium }}>
      {message?.images?.length > 0 ? (
        <View style={messageStyles.singleImgMsg(!isOwn)}>
          {message?.images?.map((img, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setIndex(index)
                setIsVisible(true)
              }}
              style={{
                flexDirection: 'row',
                justifyContent: !isOwn ? 'flex-start' : 'flex-end',
              }}
            >
              <Image
                source={{ uri: MSG_API + img?.image }}
                style={{
                  width: '70%',
                  resizeMode: 'cover',
                  height: SIZES.xxLargePicture,
                  borderRadius: SIZES.small,
                }}
              />
            </TouchableOpacity>
          ))}
          <ImageView
            images={message?.images?.map((img) => {
              return { uri: MSG_API + img.image }
            })}
            imageIndex={index}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
            swipeToCloseEnabled
            FooterComponent={({ imageIndex }) => {
              return (
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: FONT.bold,
                    marginBottom: SIZES.large,
                  }}
                >
                  {imageIndex + 1} / {message?.images?.length}
                </Text>
              )
            }}
          />
        </View>
      ) : (
        <View style={messageStyles.singleMsg(!isOwn)}>
          <Text style={{ ...messageStyles.name, fontSize: SIZES.medium }}>
            {message?.message}
          </Text>

          {/* <View style={messageStyles.singleMsgEdge} /> */}
          {/* <View style={messageStyles.singleMsgTopEdge} /> */}
        </View>
      )}

      <Text
        style={{
          ...messageStyles.type,
          alignSelf: !isOwn ? 'flex-start' : 'flex-end',
        }}
      >
        {moment.utc(message?.sent_at).local().startOf('seconds').fromNow()}
      </Text>
    </View>
  )
}

export default SingleMessage
