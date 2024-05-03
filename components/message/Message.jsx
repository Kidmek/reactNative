import { View, Text, ScrollView, RefreshControl, Vibration } from 'react-native'
import React, { useEffect, useState } from 'react'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { SIZES } from '../../constants'
import messageStyles from './message.style'
import {
  addUser,
  getAllConversations,
  getSingleConversations,
  searchCustomers,
} from '../../api/message/message'
import Search from '../common/search/Search'
import SingleChat from './SingleChat'
import { useSelector } from 'react-redux'
import { selectData, selectIsFetching } from '../../features/data/dataSlice'
import SingleUser from './SingleUser'
import { io } from 'socket.io-client'
import { SOCKET_URL } from '../../constants/strings'
import socket from '../common/utils'
import * as Notifications from 'expo-notifications'
import {
  getAllCustomers,
  getAllGroups,
  getAllGroupsNotHr,
} from '../../api/users'

const Message = () => {
  const ONE_SECOND_IN_MS = 1000

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ]
  const dispatch = store.dispatch
  const fetching = useSelector(selectIsFetching)
  const [refresh, setRefresh] = useState(true)
  const [myId, setMyId] = useState()
  const data = useSelector(selectUser)
  const toast = useToast()

  const [users, setUsers] = useState()
  const [customers, setCustomers] = useState()
  const [conversations, setConversations] = useState()
  const [selectedConv, setSelectedConv] = useState()
  const [searchQuery, setSearchQuery] = useState()
  const [searched, setSearched] = useState()
  useEffect(() => {
    if (!myId) {
      searchCustomers(
        { email: data?.email },
        dispatch,
        (value) => {
          setMyId(value[0])
          if (value[0]?.id) {
            getSingleConversations(
              { user1: value[0]?.id },
              dispatch,
              setConversations,
              toast
            )
          }
        },
        toast
      )
    } else {
      if (myId?.id) {
        getSingleConversations(
          { user1: myId?.id },
          dispatch,
          setConversations,
          toast
        )
      }
    }
    // getAllCustomers(null, dispatch, setCustomers, toast)

    // getAllGroupsNotHr(null, dispatch, setUsers, toast)
  }, [refresh, data])

  // useEffect(() => {
  //   console.log('Customers', customers?.count)
  //   if (customers?.results) {
  //     customers?.results?.map((c) => {
  //       addUser(
  //         {
  //           email: c?.email,
  //           phone: c?.phone,
  //           ProfilePicture: c?.ProfilePicture,
  //           first_name: c?.first_name,
  //           last_name: c?.last_name,
  //         },
  //         dispatch,
  //         null,
  //         toast
  //       )
  //     })
  //   }
  // }, [customers])
  // useEffect(() => {
  //   console.log('Users', users?.count)
  //   if (users?.results) {
  //     users?.results?.map((u) => {
  //       u?.userslist?.map((ul) => {
  //         addUser(
  //           {
  //             email: ul?.email,
  //             phone: ul?.phone,
  //             ProfilePicture: ul?.ProfilePicture,
  //             first_name: ul?.first_name,
  //             last_name: ul?.last_name,
  //           },
  //           dispatch,
  //           null,
  //           toast
  //         )
  //       })
  //     })
  //   }
  // }, [users])

  useEffect(() => {
    if (myId?.id) {
      socket?.on('getMsg', async (data) => {
        if (data?.sender_email?.email && data?.sender_email.first_name) {
          // Vibration.vibrate(PATTERN)
          // await Notifications.scheduleNotificationAsync({
          //   content: {
          //     title: `${data?.sender_email.first_name}  ${data?.sender_email.last_name}`,
          //     body: `${data?.message}`,
          //     data: {
          //       name: 'details',
          //       screen: 'conversation',
          //       params: {
          //         new: false,
          //         conversation: data.conversation,
          //         otherUser: data?.sender_email
          //           ? { ...data?.sender_email }
          //           : {},
          //       },
          //     },
          //   },
          //   trigger: null,
          // })
        }

        setRefresh(!refresh)
      })
      socket?.emit('addUser', myId?.id)
      socket?.on('connect_error', (error) => {
        // console.log('Connection Error:', error)
      })
      //   socket?.on('seen', (data) => {
      //     console.log(data)
      //     if (conversations?.length) {
      //       setConversations([
      //         ...conversations?.map((c) => {
      //           if (c.id === data?.conversation) {
      //             c.seen = true
      //           }
      //           return c
      //         }),
      //       ])
      //     }
      //   })
    }
  }, [myId])
  const onSearch = () => {
    searchCustomers({ email: searchQuery }, dispatch, setSearched, toast)
  }

  useEffect(() => {
    if (searchQuery) {
      onSearch()
    }
  }, [searchQuery])
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={fetching}
          onRefresh={() => setRefresh(!refresh)}
        />
      }
      style={messageStyles.container}
      contentContainerStyle={{
        paddingVertical: SIZES.medium,
      }}
    >
      <Search
        onSearch={() => {
          onSearch()
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={'Search Chats'}
      />
      {/* Chats */}
      <View
        style={{
          paddingHorizontal: SIZES.medium,
          marginVertical: SIZES.medium,
        }}
      >
        {!searchQuery ? (
          data &&
          conversations?.map((conversation, index) => {
            return (
              <SingleChat key={index} conversation={conversation} data={data} />
            )
          })
        ) : searched?.length > 0 ? (
          searched?.map((user, index) => {
            return <SingleUser user={user} key={index} />
          })
        ) : (
          <Text style={{ ...messageStyles.name, textAlign: 'center' }}>
            No Users Found
          </Text>
        )}
      </View>
    </ScrollView>
  )
}

export default Message
