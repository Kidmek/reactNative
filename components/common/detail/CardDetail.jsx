import { View, Text, Pressable } from 'react-native'
import React, { Children } from 'react'
import styles from './detail.style'
import { WEB_URL, mSQUARE } from '../../../constants/strings'
import { Feather } from '@expo/vector-icons'
import { COLORS, FONT, SIZES } from '../../../constants'
import * as FileSystem from 'expo-file-system'
import * as Linking from 'expo-linking'
import { useToast } from 'react-native-toast-notifications'
import { saveFile } from '../utils'

const CardDetail = ({
  label,
  value,
  isPrice,
  isSpace,
  isDate,
  download,
  vertical,
  status,
  CardChild,
  onlyPreview,
  underline,
}) => {
  const toast = useToast()
  const onDownload = async () => {
    let fileName = value?.split('/')
    fileName = fileName[fileName.length - 1]
    const result = await FileSystem.downloadAsync(
      value,
      FileSystem.documentDirectory + fileName
    )
    saveFile(result.uri, fileName, result.headers['content-type'], toast)
  }

  return (
    <View
      style={{
        ...styles.cardDetailWrapper(vertical, underline),
      }}
    >
      <Text style={styles.cardDetailLabel(underline)}>{label}</Text>
      {download ? (
        <View
          style={{
            ...styles.cardDetailValue(vertical),
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: SIZES.small,
          }}
        >
          <Pressable
            onPress={onDownload}
            style={{
              ...styles.cardDetailValue(vertical),
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: SIZES.small,
            }}
          >
            <Feather
              name='download'
              size={SIZES.tabIcons}
              color={COLORS.primary}
            />
            <Text
              style={{
                color: 'blue',
                fontFamily: FONT.bold,
              }}
            >
              Download
            </Text>
          </Pressable>

          {/* {!onlyPreview && (
            <Pressable
              onPress={() => {
                onDownload()
                // Linking.openURL(  value)
              }}
            >
              <Feather
                name='eye'
                size={SIZES.tabIcons}
                color={COLORS.primary}
              />
            </Pressable>
          )} */}
        </View>
      ) : !CardChild ? (
        <Text
          style={{
            ...styles.cardDetailValue(vertical, status),
          }}
        >
          {isDate ? value : value}
          {isPrice && value ? ' Birr' : isSpace ? ' ' + mSQUARE : ''}
        </Text>
      ) : (
        CardChild
      )}
    </View>
  )
}

export default CardDetail
