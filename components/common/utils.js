import { io } from 'socket.io-client'
import { SOCKET_URL } from '../../constants/strings'
import * as FileSystem from 'expo-file-system'
import { Platform, Share } from 'react-native'
import { unparse } from 'papaparse'
import * as Sharing from 'expo-sharing'

export const currencyFormat = (num) => {
  return num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const getDayDifference = (startDate, endDate) => {
  const newEndDate = new Date(endDate)
  const newStartDate = new Date(startDate)
  // To calculate the time difference of two dates
  let Difference_In_Time = newEndDate?.getTime() - newStartDate?.getTime()

  // To calculate the no. of days between two dates
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24))

  return Difference_In_Days
}

const socket = io.connect(SOCKET_URL)
export default socket

export async function makeCSV(data, toast) {
  if (data) {
    const fileUri = FileSystem.documentDirectory + 'example.csv'

    const csv = unparse(data)
    saveFile(fileUri, 'example.csv', null, toast, csv)
  }
  // Define the file path
}

export async function saveFile(uri, filename, mimetype, toast, data) {
  try {
    if (Platform.OS === 'android') {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
      if (permissions.granted) {
        if (data) {
          // Write the file
          await FileSystem.writeAsStringAsync(uri, data)
            .then(async () => {
              if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri)
              } else {
                Alert.alert(
                  'Sharing not available',
                  'Unable to share the CSV file on this device.'
                )
              }
            })
            .catch((error) => {
              console.error('Error saving CSV file', error)
              toast.show('Error', 'Failed to save CSV file', {
                type: 'danger',
              })
            })
          return
        }
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
  } catch (err) {
    console.log('Error At Saving File', err)
  }
}

export const changeToBas64 = async (image) => {
  const base64 = await FileSystem.readAsStringAsync(image?.uri, {
    encoding: 'base64',
  })
  const type =
    image?.mimeType ?? `${image?.type}/${image?.uri?.split('.').at(-1)}`
  return 'data:' + type + ';base64,' + base64
}
