import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { MAP_KEY } from '../../../constants/strings'

const MapInput = ({ notifyChange }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2}
      autoFocus={true}
      listViewDisplayed={false}
      fetchDetails={true}
      onPress={(data, details = null) => {
        console.log('Pressed')
        notifyChange(details.geometry.location)
      }}
      query={{
        key: MAP_KEY,
        language: 'en',
      }}
      nearbyPlacesAPI='GooglePlacesSearch'
      debounce={200}
      disableScroll={true}
    />
  )
}

export default MapInput
