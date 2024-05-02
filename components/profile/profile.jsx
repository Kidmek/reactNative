import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from '../common/styles/warehouse.style'
import profileStyles from './profile.style'
import { useNavigation } from 'expo-router'
import { COLORS, SIZES } from '../../constants'
import { Ionicons } from '@expo/vector-icons'
import { getCurrentUser } from '../../api/auth/auth'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../features/data/dataSlice'
import CardDetail from '../common/detail/CardDetail'
import MapView from 'react-native-maps'
import Input from '../common/input/Input'
import * as ImagePicker from 'expo-image-picker'
import { PASSWORD } from '../../constants/strings'

export default function Profile() {
  const [user, setUser] = useState()
  const [temp, setTemp] = useState({
    image: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    ProfilePicture: '',
    password: '',
    confirmPassword: '',
  })
  const [edit, setEdit] = useState(false)
  const [initialZoom, setInitialZoom] = useState(false)
  const dispatch = store.dispatch
  const navigation = useNavigation()
  const toast = useToast()
  const fetching = useSelector(selectIsFetching)
  const mapRef = useRef()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 6,
    })
    if (!result.canceled && result.assets.length) {
      setTemp({
        ...temp,
        ProfilePicture: result.assets[0],
      })
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity
            style={profileStyles.editContainer}
            onPress={() => {
              if (!edit) {
                navigation.goBack()
              } else {
                setEdit(false)
              }
            }}
          >
            <Ionicons
              name={edit ? 'close-sharp' : 'arrow-back'}
              size={SIZES.large}
              color={edit ? COLORS.red : undefined}
            />
            {edit && (
              <Text style={{ ...profileStyles.headerEdit, color: COLORS.red }}>
                Cancel
              </Text>
            )}
          </TouchableOpacity>
        )
      },
      headerRight: () => {
        return (
          <TouchableOpacity
            style={profileStyles.editContainer}
            onPress={() => {
              setEdit(!edit)
            }}
          >
            <Text style={profileStyles.headerEdit}>
              {edit ? 'Save' : 'Edit'}
            </Text>
            <Ionicons
              name={edit ? 'checkmark-sharp' : 'pencil-sharp'}
              size={SIZES.medium}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        )
      },
    })
  }, [edit])

  useEffect(() => {
    getCurrentUser(dispatch, toast, setUser)
  }, [])
  useEffect(() => {
    if (user) {
      const { first_name, last_name, email, phone } = user
      setTemp({
        first_name,
        last_name,
        email,
        phone,
      })
    }
  }, [user])
  return fetching ? (
    <View style={profileStyles.container}>
      <ActivityIndicator
        style={styles.activityIndicator}
        size={SIZES.xxLarge}
        color={COLORS.primary}
      />
    </View>
  ) : (
    <ScrollView
      style={profileStyles.container}
      contentContainerStyle={profileStyles.contentContainer}
    >
      <View
        style={{
          ...styles.onlyTextContainer,
          width: 200,
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            ...profileStyles.singleContainer,
            alignItems: 'center',
            paddingVertical: 0,
          }}
        >
          <Image
            source={
              edit && temp?.ProfilePicture?.uri?.length > 0
                ? {
                    uri: temp?.ProfilePicture?.uri,
                  }
                : user?.ProfilePicture
                ? {
                    uri: user?.ProfilePicture,
                  }
                : require('../../assets/images/avatar.png')
            }
            style={{ width: 200, height: 200 }}
          />
          {(!user?.ProfilePicture || edit) && (
            <TouchableOpacity
              style={profileStyles.profileEditContainer}
              onPress={pickImage}
            >
              <Text
                style={{
                  ...profileStyles.locationTitle,
                  color:
                    !user?.ProfilePicture && !edit
                      ? COLORS.red
                      : COLORS.primary,
                }}
              >
                {!user?.ProfilePicture && !edit
                  ? ' No Profile Picture'
                  : 'Change Picture'}
              </Text>
              <Ionicons
                name={'image-outline'}
                size={SIZES.large}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* {user?.ProfilePicture ? (
          <Image
            source={{
              uri: user?.ProfilePicture,
            }}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          <View
            style={{ ...profileStyles.singleContainer, alignItems: 'center' }}
          >
            <Image
              source={require('../../assets/images/avatar.png')}
              style={{ width: 100, height: 100 }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  ...profileStyles.locationTitle,
                  // textDecorationLine: 'underline',
                  // textDecorationStyle: 'double',
                  color: COLORS.red,
                }}
              >
                No Profile Picture
              </Text>
            </View>
          </View>
        )} */}
      </View>

      {!edit ? (
        <View
          style={{
            ...styles.onlyTextContainer,
            ...profileStyles.singleContainer,
          }}
        >
          <CardDetail
            label={'Full Name'}
            value={user?.first_name + ' ' + user?.last_name}
            underline
          />
          <CardDetail label={'Email'} value={user?.email} underline />
          <CardDetail label={'Phone number'} value={user?.phone} underline />
        </View>
      ) : (
        <View
          style={{
            ...profileStyles.singleContainer,
          }}
        >
          <Input
            state={temp.first_name}
            setState={(v) => {
              setTemp({ ...temp, first_name: v })
            }}
            label='First Name'
          />
          <Input
            state={temp.last_name}
            setState={(v) => {
              setTemp({ ...temp, last_name: v })
            }}
            label='Last Name'
          />
          <Input
            state={temp.email}
            setState={(v) => {
              setTemp({ ...temp, email: v })
            }}
            label='Email'
          />
          <Input
            state={temp.phone}
            setState={(v) => {
              setTemp({ ...temp, phone: v })
            }}
            label='Phone'
          />
          <Input
            state={temp.password}
            setState={(v) => {
              setTemp({ ...temp, password: v })
            }}
            label='Password'
            type={PASSWORD}
          />
          <Input
            state={temp.confirmPassword}
            setState={(v) => {
              setTemp({ ...temp, confirmPassword: v })
            }}
            label='Confirm Password'
            type={PASSWORD}
          />
        </View>
      )}

      {!edit && (
        <View style={profileStyles.mapContainer}>
          <Text style={profileStyles.locationTitle}>Current Location</Text>
          <View
            style={{
              ...styles.onlyTextContainer,
              ...profileStyles.singleContainer,
              paddingVertical: 0,
              paddingHorizontal: 0,
            }}
          >
            <MapView
              style={{
                width: '100%',
                height: Dimensions.get('screen').height * 0.5,
              }}
              ref={mapRef}
              showsUserLocation={true}
              followsUserLocation
              onUserLocationChange={(coord) => {
                if (mapRef.current) {
                  mapRef.current.animateCamera({
                    center: {
                      latitude: coord.nativeEvent.coordinate.latitude,
                      longitude: coord.nativeEvent.coordinate.longitude,
                    },
                    zoom: initialZoom ? undefined : 10,
                    duration: 1,
                  })
                  setInitialZoom(true)
                }
              }}
            ></MapView>
          </View>
        </View>
      )}
    </ScrollView>
  )
}
