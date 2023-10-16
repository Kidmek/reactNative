import { StyleSheet } from 'react-native'
import { COLORS, FONT, SHADOWS, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  container: {
    gap: SIZES.small,
    width: '100%',
    paddingVertical: SIZES.large,
    paddingHorizontal: SIZES.medium,
  },
  singleContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.gray2,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.small,
    ...SHADOWS.small,
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
  },
  outerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    marginBottom: SIZES.xxSmall,
  },
  innerTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  amount: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.secondary,
  },
  textContainer: {
    paddingHorizontal: SIZES.large,
    flex: 1,
  },
  icon: {
    minWidth: '12.5%',
  },
})

export default styles
