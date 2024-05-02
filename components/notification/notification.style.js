import { StyleSheet } from 'react-native'
import { COLORS, SIZES, FONT } from '../../constants'

const notificationStyles = StyleSheet.create({
  notificationWrapper: (seen) => {
    return {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SIZES.small,
      backgroundColor: seen ? 'transparent' : COLORS.primary + '55',
      borderRadius: SIZES.small,
      paddingVertical: SIZES.small,
      paddingHorizontal: SIZES.medium,
      marginBottom: SIZES.small,
    }
  },
  textWrapper: {
    flex: 1,
  },
  content: (seen) => {
    return {
      fontFamily: seen ? FONT.medium : FONT.bold,
    }
  },
  date: {
    fontFamily: FONT.regular,
  },
})

export default notificationStyles
