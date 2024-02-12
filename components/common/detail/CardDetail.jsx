import { View, Text, Pressable, Platform, Share } from 'react-native'
import React, { Children } from 'react'
import styles from './detail.style'
import { WEB_URL, mSQUARE } from '../../../constants/strings'
import { Feather } from '@expo/vector-icons'
import { COLORS, FONT, SIZES } from '../../../constants'
import * as FileSystem from 'expo-file-system'
import * as Linking from 'expo-linking'
import { useToast } from 'react-native-toast-notifications'

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
}) => {
  const toast = useToast()
  const onDownload = async () => {
    const base64Code = value.split('base64,')
    let fileName = value?.split('/')
    fileName = fileName[fileName.length - 1]
    const result = await FileSystem.downloadAsync(
      value,
      FileSystem.documentDirectory + fileName
    )
    saveFile(result.uri, fileName, result.headers['content-type'])
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

  async function saveFile(uri, filename, mimetype) {
    if (Platform.OS === 'android') {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        })

        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            const url = await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            })
            toast.show(`Saved File To  ${uri}`, {
              type: 'success',
            })
          })
          .catch((e) => console.log(e))
      } else {
        toast.show(`Permission Denied`, {
          type: 'warning',
        })
      }
    } else {
      await Share.share({
        title: 'dummy',
        url: uri,
      })
    }
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
          {isDate ? Date(value) : value}
          {isPrice && value ? ' Birr' : isSpace ? ' ' + mSQUARE : ''}
        </Text>
      ) : (
        CardChild
      )}
    </View>
  )
}

export default CardDetail
