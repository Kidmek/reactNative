import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Ionicons, AntDesign } from '@expo/vector-icons'
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
import { selectUser } from '../../features/data/dataSlice'
import { useSelector } from 'react-redux'
import socket from '../common/utils'
import * as DocumentPickerApi from 'expo-document-picker'
import { MSG_API } from '../../constants/strings'
import axios from 'axios'

const Conversation = ({ params }) => {
  const dispatch = store.dispatch
  const toast = useToast()
  const scrollRef = useRef()
  const navigation = useNavigation()
  const [messages, setMessages] = useState()
  const [text, setText] = useState()
  const data = useSelector(selectUser)
  const [conversation, setConversation] = useState(params?.conversation)
  const [files, setFiles] = useState()

  const [IDs, setIDs] = useState({
    my: {},
    other: {},
  })
  const [loading, setLoading] = useState(false)

  // Document Picker
  const pickDocument = async () => {
    let result = await DocumentPickerApi.getDocumentAsync({
      multiple: true,
      type: 'image/*',
    })
    if (result?.assets?.length) {
      setFiles(result.assets)
    }
  }

  //   On Message Send
  const sendMsg = async () => {
    const formData = new FormData()
    if (files && files?.length) {
      files.forEach((file) => {
        const { name, mimeType, uri } = file
        formData.append('images', { name, type: mimeType, uri })
      })
    }

    const data = {
      sender: IDs.my?.id,
      reciever: IDs.other?.id,
      seen: false,
      message: text,
      conversation: conversation?.id ?? data?.id,
    }

    formData.append('sender', IDs.my?.id)
    formData.append('reciever', IDs.other?.id)
    formData.append('seen', false)
    formData.append('message', text)
    formData.append('conversation', conversation?.id ?? data?.id)

    try {
      const response = await axios({
        method: 'POST',
        url: MSG_API + '/messages',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (response.status === 200) {
        socket.emit('sendMsg', {
          sender: IDs.my?.id,
          reciever: IDs.other?.id,
          message: text,
          conversation: conversation?.id,
          sender_email: IDs.my,
          images: response.data?.images,
        })
        setMessages([
          ...messages,
          {
            sender: IDs.my?.id,
            reciever: IDs.other?.id,
            seen: false,
            message: text,
            conversation: data?.id,
            images: response.data?.images,
            sent_at: new Date(),
          },
        ])
      } else {
        console.log('Upload failed', response.status)
      }
    } catch (error) {
      console.log(
        'Error:',
        error.response ? error.response.data : error.message
      )
    }
  }
  const onSend = async () => {
    setText('')
    setFiles([])
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
          sendMsg()
        },
        toast
      )
    } else {
      sendMsg()
    }
  }

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
    if (conversation && !messages?.length) {
      setLoading(true)
      getConversationMsgs(
        { conversation: conversation?.id },
        dispatch,
        (msgs) => {
          setLoading(false)
          setMessages(msgs)
        },
        toast
      )
    }
  }, [conversation])

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
                  images: data?.images,
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
        // console.log('Connection Error:', error)
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

  useEffect(() => {
    if (text?.length) {
      setFiles([])
    }
  }, [text])

  return loading ? (
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
          messages?.map(
            (message, index) =>
              (message?.message?.length > 0 || message?.images?.length > 0) && (
                <SingleMessage
                  key={index}
                  message={message}
                  isOwn={
                    message?.sender?.email
                      ? message?.sender?.email === IDs?.my?.email
                      : message?.sender === IDs?.my?.id
                  }
                />
              )
          )
        ) : (
          <Text style={{ ...messageStyles.type, textAlign: 'center' }}>
            No Messages Yet
          </Text>
        )}
      </ScrollView>
      <View style={messageStyles.inputContainer}>
        {(!text || text?.length == 0) && (
          <TouchableOpacity
            style={messageStyles.attachmentIcon}
            onPress={pickDocument}
            disabled={text || text?.length > 0}
          >
            <Ionicons
              name='document-attach-outline'
              size={SIZES.xxLarge}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        )}
        {files?.length > 0 ? (
          <ScrollView horizontal>
            {files?.map((image, index) => (
              <View key={index} style={messageStyles.imagesWrapper}>
                <Image
                  style={messageStyles.image}
                  source={{ uri: image?.uri }}
                />
                <TouchableOpacity
                  style={messageStyles.minusIcon}
                  onPress={() => {
                    setFiles((prev) =>
                      prev.filter((prevImage) => prevImage !== image)
                    )
                  }}
                >
                  <AntDesign name='minuscircle' size={15} color={COLORS.red} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <TextInput
            multiline
            style={messageStyles.inputStyle}
            value={text}
            onChangeText={setText}
            placeholder='Write Your Message'
          />
        )}
        <TouchableOpacity
          style={messageStyles.iconContainer(
            !files?.length && (!text || text.length === 0)
          )}
          onPress={onSend}
          disabled={!files?.length && (!text || text?.length === 0)}
        >
          <Ionicons name='send' size={30} color={COLORS.pureWhite} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Conversation
