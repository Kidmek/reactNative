import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONT, SIZES } from '../../constants'
import {
  createConversation,
  getConversationMsgs,
  getSingleConversations,
  markConversationSeen,
  searchCustomers,
  sendMessage,
} from '../../api/message/message'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import SingleMessage from './SingleMessage'
import messageStyles from './message.style'
import { selectData } from '../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import socket from '../common/utils'

const Conversation = ({ params }) => {
  const dispatch = store.dispatch
  const toast = useToast()
  const scrollRef = useRef()
  const navigation = useNavigation()
  const [messages, setMessages] = useState()
  const [text, setText] = useState()
  const data = useSelector(selectData)
  const [conversation, setConversation] = useState(params?.conversation)

  const [IDs, setIDs] = useState({
    my: {},
    other: {},
  })
  // console.log('Conversation Params', params)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: FONT.regular,
        textTransform: 'uppercase',
      },
      headerTitle:
        params?.otherUser?.first_name + ' ' + params?.otherUser?.last_name,

      headerLeft: () => (
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            color: COLORS.primary,
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name='chevron-back' size={24} color={'#000'} />
        </TouchableOpacity>
      ),
    })
  }, [])

  //   Get Messages and Mark Seen
  useEffect(() => {
    if (conversation) {
      getConversationMsgs(
        { conversation: conversation?.id },
        dispatch,
        setMessages,
        toast
      )
    }
  }, [])

  //   Fetch Ids
  useEffect(() => {
    searchCustomers(
      { email: data?.email },
      dispatch,
      (value) => {
        const my = value[0]
        searchCustomers(
          { email: params?.otherUser?.email },
          dispatch,
          (value) => setIDs({ my, other: value[0] }),
          toast
        )
      },
      toast
    )
  }, [data])

  // Socket
  useEffect(() => {
    if (IDs.my?.id && IDs.other?.id) {
      socket?.emit('addUser', IDs.my?.id)

      socket?.on('getMsg', (data) => {
        try {
          if (conversation?.id === data?.conversation) {
            if (IDs.my?.id && IDs.other?.id) {
              const newMsgs = [
                ...messages,
                {
                  reciever: IDs.my?.id,
                  sender: IDs.other?.id,
                  seen: true,
                  message: data?.message,
                  conversation: data?.conversation,
                  sent_at: new Date(),
                },
              ]

              setMessages([...newMsgs])
            }
          }
        } catch (err) {
          console.log(err)
        }
      })
      socket?.on('connect_error', (error) => {
        console.log('Connection Error:', error)
      })

      if (
        conversation &&
        conversation.seen == false &&
        conversation?.last_sender?.email != data?.email
      ) {
        markConversationSeen(
          { conversation: conversation?.id },
          dispatch,
          () => {
            // socket.emit('seen', {
            //   reciever: IDs.other?.id,
            //   conversation: conversation?.id,
            // })
          },
          toast
        )
      }
    }
  }, [messages, IDs])

  //   Get Conversations
  useEffect(() => {
    if (IDs.my?.id && IDs.other?.id) {
      getSingleConversations(
        { user1: IDs.my?.id, user2: IDs.other?.id },
        dispatch,
        (value) => {
          if (value.length) {
            setConversation(value[0])
          }
        },
        toast
      )
    }
  }, [IDs])

  //   On Message Send
  const onSend = () => {
    setText('')
    const data = {
      sender: IDs.my?.id,
      reciever: IDs.other?.id,
      seen: false,
      message: text,
      conversation: conversation?.id ?? data?.id,
    }
    if (!conversation?.id) {
      createConversation(
        {
          last_sender: IDs?.my?.id,
          users: [IDs?.my?.id, IDs?.other?.id],
          last_message: text,
          seen: false,
        },
        dispatch,
        (data) => {
          setConversation(data)
          sendMessage(
            data,
            dispatch,
            () => {
              socket.emit('sendMsg', {
                sender: IDs.my?.id,
                reciever: IDs.other?.id,
                message: text,
                conversation: conversation?.id,
                sender_email: IDs.my,
              })
              setMessages([
                {
                  sender: IDs.my?.id,
                  reciever: IDs.other?.id,
                  seen: false,
                  message: text,
                  conversation: data?.id,
                  sent_at: new Date(),
                },
              ])
            },
            toast
          )
        },
        toast
      )
    } else {
      sendMessage(
        data,
        dispatch,
        () => {
          setMessages([
            ...messages,
            {
              sender: IDs.my?.id,
              reciever: IDs.other?.id,
              seen: false,
              message: text,
              conversation: conversation?.id,
              sent_at: new Date(),
            },
          ])
          socket.emit('sendMsg', {
            sender: IDs.my?.id,
            reciever: IDs.other?.id,
            message: text,
            conversation: conversation?.id,
            sender_email: IDs.my,
          })
        },
        toast
      )
    }
  }
  return (conversation && messages === undefined) ||
    !IDs.my?.id ||
    !IDs.other?.id ? (
    <ActivityIndicator
      size={SIZES.xxLarge}
      color={COLORS.primary}
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
      }}
    />
  ) : (
    <View
      style={{
        position: 'relative',
        flex: 1,
      }}
    >
      <ScrollView
        ref={scrollRef}
        style={{ backgroundColor: COLORS.pureWhite }}
        contentContainerStyle={{
          paddingTop: SIZES.small,
          paddingHorizontal: SIZES.medium,
          paddingBottom: SIZES.large * 4,
        }}
        onContentSizeChange={() =>
          scrollRef.current.scrollToEnd({ animated: true })
        }
      >
        {messages ? (
          messages?.map((message, index) => (
            <SingleMessage
              key={index}
              message={message}
              isOwn={
                message?.sender?.email
                  ? message?.sender?.email === IDs?.my?.email
                  : message?.sender === IDs?.my?.id
              }
            />
          ))
        ) : (
          <Text style={{ ...messageStyles.type, textAlign: 'center' }}>
            No Messages Yet
          </Text>
        )}
      </ScrollView>
      <View style={messageStyles.inputContainer}>
        <TextInput
          multiline
          style={messageStyles.inputStyle}
          value={text}
          onChangeText={setText}
          placeholder='Write Your Message'
        />
        <TouchableOpacity
          style={messageStyles.iconContainer(!text || text.length === 0)}
          onPress={onSend}
          disabled={!text || text?.length === 0}
        >
          <Ionicons name='send' size={30} color={COLORS.pureWhite} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Conversation
