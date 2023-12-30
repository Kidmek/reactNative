import { View, Text, Pressable, Platform, Share } from 'react-native'
import React from 'react'
import styles from './detail.style'
import { mSQUARE } from '../../../constants/strings'
import { Feather } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../../constants'
import * as FileSystem from 'expo-file-system'
import * as Linking from 'expo-linking'

const CardDetail = ({
  label,
  value,
  isPrice,
  isSpace,
  isDate,
  download,
  vertical,
  status,
}) => {
  const onDownload = async () => {
    const base64Code = value.split('base64,')
    console.log(base64Code[0])
    const result = await FileSystem.downloadAsync(
      value,
      FileSystem.documentDirectory + 'dummy.jpg'
    )
    console.log(result)
    saveFile(result.uri, 'dummy.jpg', result.headers['content-type'])
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
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            })
          })
          .catch((e) => console.log(e))
      } else {
        await Share.share({
          title: 'dummy',
          url: uri,
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
            gap: SIZES.small,
          }}
        >
          <Pressable>
            <Feather
              name='eye'
              size={SIZES.tabIcons}
              color={COLORS.primary}
              onPress={() => {
                Linking.openURL(value)
              }}
            />
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
        <Text style={styles.cardDetailValue(vertical, status)}>
          {isDate ? Date(value) : value}
          {isPrice && value ? ' Birr' : isSpace ? ' ' + mSQUARE : ''}
        </Text>
      )}
    </View>
  )
}

export default CardDetail
