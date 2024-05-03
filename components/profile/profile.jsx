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
import { getCurrentUser, updateCurrentUser } from '../../api/auth/auth'
import { store } from '../../store'
import { useToast } from 'react-native-toast-notifications'
import { useSelector } from 'react-redux'
import { selectIsFetching } from '../../features/data/dataSlice'
import CardDetail from '../common/detail/CardDetail'
import MapView from 'react-native-maps'
import Input from '../common/input/Input'
import * as ImagePicker from 'expo-image-picker'
import { PASSWORD } from '../../constants/strings'
import { changeToBas64 } from '../common/utils'

export default function Profile() {
  const [user, setUser] = useState()
  const [error, setError] = useState()
  const [temp, setTemp] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    ProfilePicture: '',
    password: '',
    confirmPassword: '',
  })
  const [edit, setEdit] = useState(false)
  const dispatch = store.dispatch
  const navigation = useNavigation()
  const toast = useToast()
  const fetching = useSelector(selectIsFetching)
  const mapRef = useRef()

  const onSubmit = async () => {
    if (
      !error &&
      temp.email?.length &&
      temp.last_name?.length &&
      temp.first_name?.length &&
      temp.password?.length &&
      temp.confirmPassword?.length
    ) {
      // let password = null

      // if (temp.password?.length) {
      //   if (temp.confirmPassword?.length) {
      //     password = temp.password
      //   } else {
      //     setError("Passwords don't match")
      //     return toast.show('All fields required', {
      //       type: 'danger',
      //     })
      //   }
      // }
      let pic = await changeToBas64(temp.ProfilePicture)
      const { password, confirmPassword, ProfilePicture, ...rest } = temp
      updateCurrentUser(
        user?.id,
        {
          ...user,
          ...rest,
          ProfilePicture: temp.ProfilePicture ? pic : user.ProfilePicture,
          password,
          password_confirmation: confirmPassword,
          profile_url: temp.ProfilePicture ? pic : user.ProfilePicture,
        },
        dispatch,
        toast,
        (data) => {
          setUser(data)
          setEdit(false)
          toast.show('Successfully updated', {
            type: 'success',
          })
        }
      )
    } else {
      toast.show('All fields required', {
        type: 'danger',
      })
    }
  }

  const checkPasswords = (value) => {
    const password = value?.password ?? temp.password
    const confirmPassword = value?.confirmPassword ?? temp?.confirmPassword
    if (
      password?.length &&
      confirmPassword?.length &&
      password != confirmPassword
    ) {
      setError("Passwords don't match")
    } else {
      setError(undefined)
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
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
              if (!edit) {
                setEdit(true)
              } else {
                onSubmit()
              }
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
  }, [edit, temp])

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
              onPress={() => {
                if (user?.ProfilePicture || edit) {
                  pickImage()
                }
              }}
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
              {(user?.ProfilePicture || edit) && (
                <Ionicons
                  name={'image-outline'}
                  size={SIZES.large}
                  color={COLORS.primary}
                />
              )}
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
              checkPasswords({ password: v })
            }}
            label='Password'
            type={PASSWORD}
          />
          <Input
            state={temp.confirmPassword}
            setState={(v) => {
              setTemp({ ...temp, confirmPassword: v })
              checkPasswords({ confirmPassword: v })
            }}
            label='Confirm Password'
            type={PASSWORD}
            error={error}
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
              onUserLocationChange={async (coord) => {
                if (mapRef.current) {
                  const dest = {
                    latitude: coord.nativeEvent.coordinate.latitude,
                    longitude: coord.nativeEvent.coordinate.longitude,
                  }
                  const camera = await mapRef.current.getCamera()
                  mapRef.current.animateCamera({
                    center: dest,
                    zoom: camera.zoom > 2 ? undefined : 10,
                    duration: 1,
                  })
                }
              }}
            ></MapView>
          </View>
        </View>
      )}
    </ScrollView>
  )
}
