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
    borderRadius: SIZES.large,
  },
})

export default styles
