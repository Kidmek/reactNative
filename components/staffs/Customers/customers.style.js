import { StyleSheet } from 'react-native'
import { FONT, SIZES } from '../../../constants'

export const customerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignContent: 'space-between',
    alignItems: 'stretch',
    gap: SIZES.large,
    paddingHorizontal: SIZES.medium,
  },
  textContainer: {
    flex: 1,
  },
  popUpText: (color) => {
    return {
      fontFamily: FONT.medium,
      color: color,
    }
  },
})
