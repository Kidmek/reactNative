import { StyleSheet } from 'react-native'
import { COLORS, FONT, SHADOWS, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    backgroundColor: COLORS.pureWhite,
    justifyContent: 'center',
    flex: 1,
  },
  wrapper: {
    gap: SIZES.small,
    width: '100%',
    paddingVertical: SIZES.large,
    paddingHorizontal: SIZES.medium,
  },
  col: {
    flexDirection: 'row',
    gap: SIZES.xxSmall,
  },
  singleContainer: {
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: SIZES.small,
    borderColor: COLORS.gray2,
    paddingVertical: SIZES.xxSmall,
    // ...SHADOWS.small,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FONT.regular,
    color: COLORS.secondary,
  },
  amount: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  textContainer: {
    paddingHorizontal: SIZES.xSmall,
    flex: 1,
  },
  icon: {
    marginHorizontal: SIZES.xSmall,
    // minWidth: '12.5%',
  },
})

export default styles
