import { View, Text, Pressable } from 'react-native'
import React from 'react'
import styles from './detail.style'
import { mSQUARE } from '../../../constants/strings'
import { Feather } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../../constants'
import * as FileSystem from 'expo-file-system'

const CardDetail = ({
  label,
  value,
  isPrice,
  isSpace,
  isDate,
  download,
  vertical,
}) => {
  const onDownload = async () => {
    console.log(value)
    const base64Code = value.split('base64,')
    console.log(base64Code[0])
    // const filename = FileSystem.documentDirectory + 'some_unique_file_name.png'
    // await FileSystem.writeAsStringAsync(filename, base64Code, {
    //   encoding: FileSystem.EncodingType.Base64,
    // })

    // const fileName = 'download.'
    // const result = await FileSystem.downloadAsync(
    //   value,
    //   FileSystem.documentDirectory + fileName
    // )
  }

  return (
    <View
      style={{
        ...styles.cardDetailWrapper(vertical),
      }}
    >
      <Text style={styles.cardDetailLabel}>{label}</Text>
      {download ? (
        <View
          style={{
            ...styles.cardDetailValue(vertical),
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: SIZES.small,
          }}
        >
          <Pressable>
            <Feather name='eye' size={SIZES.tabIcons} color={COLORS.primary} />
          </Pressable>
          <Pressable onPress={onDownload}>
            <Feather
              name='download'
              size={SIZES.tabIcons}
              color={COLORS.primary}
            />
          </Pressable>
        </View>
      ) : (
        <Text style={styles.cardDetailValue(vertical)}>
          {isDate ? Date(value) : value}
          {isPrice && value ? ' Birr' : isSpace ? ' ' + mSQUARE : ''}
        </Text>
      )}
    </View>
  )
}

export default CardDetail
