import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: SIZES.xxLarge,
    paddingBottom: SIZES.xLarge,
    gap: SIZES.small,
  },
  btn: {
    borderRadius: SIZES.small,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
  },
  text: {
    fontFamily: FONT.medium,
    textTransform: 'uppercase',
  },
})

export default styles
