import { StyleSheet } from 'react-native'

import { COLORS, FONT, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  headerTitle: {
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  headerBtn: {
    fontFamily: FONT.regular,
    flexDirection: 'row',
    marginBottom: SIZES.large,
    gap: SIZES.small,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    paddingVertical: SIZES.xxSmall,
    paddingHorizontal: SIZES.xSmall,
    width: 'fit-content',
    alignSelf: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    width: '100%',
    marginTop: SIZES.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderBottomWidth: 2,
    borderBottomColor:
      activeJobType === item ? COLORS.secondary : 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    gap: SIZES.xxSmall,
    paddingVertical: SIZES.xSmall,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: activeJobType === item ? FONT.bold : FONT.medium,
    color: activeJobType === item ? COLORS.secondary : COLORS.gray,
  }),
  categoryText(isActive) {
    return {
      fontSize: 14,
      fontFamily: FONT.regular,
      color: isActive ? COLORS.black : COLORS.grey,
      textAlign: 'center',
    }
  },

  categoriesBtn(isActive) {
    return {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 8,
      borderBottomWidth: isActive ? 2 : 0,
      borderBottomColor: '#000',
    }
  },
})

export default styles
