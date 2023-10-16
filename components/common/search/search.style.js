import { StyleSheet } from 'react-native'

import { COLORS, FONT, SIZES, SHADOWS } from '../../../constants'

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.medium,
    height: '100%',
    ...SHADOWS.medium,
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: '100%',
    height: '100%',

    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnImage: {
    width: '50%',
    height: '50%',
    tintColor: COLORS.white,
  },
})

export default styles
