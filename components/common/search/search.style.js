import { StyleSheet } from 'react-native'

import { COLORS, FONT, SIZES, SHADOWS } from '../../../constants'

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: SIZES.large,
    marginHorizontal: SIZES.medium,
    gap: SIZES.medium,
  },
  searchWrapper: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.small,
    backgroundColor: COLORS.pureWhite,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.lightGrey,
    alignItems: 'center',
    borderRadius: SIZES.xxLarge,
    ...SHADOWS.medium,
    flex: 1,
  },
  searchInput: {
    paddingVertical: SIZES.medium,
    fontFamily: FONT.regular,
    paddingHorizontal: SIZES.small,
    flex: 1,
  },
  searchBtn: {
    padding: SIZES.small,
    backgroundColor: COLORS.pureWhite,
    ...SHADOWS.medium,
    borderRadius: 999999,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '90deg' }],
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
  },
})

export default styles
