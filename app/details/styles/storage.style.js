import { StyleSheet } from 'react-native'
import { SHADOWS, COLORS, FONT, SIZES } from '../../../constants'

const storageStyles = StyleSheet.create({
  layoutDetails: {
    marginTop: SIZES.small,
    paddingHorizontal: SIZES.small,
  },
  listContainer: {
    gap: SIZES.small,
    marginTop: SIZES.small,
    paddingHorizontal: SIZES.small,
  },

  singleItem: {
    marginHorizontal: SIZES.medium,
    backgroundColor: '#fff',
    ...SHADOWS.medium,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    shadowColor: COLORS.white,
  },
  singleBtnContainer: {
    flexDirection: 'row',
    gap: SIZES.small,
  },
  btn(isAdd) {
    return {
      alignItems: 'center',
      gap: SIZES.xxSmall,
      alignSelf: 'flex-end',
      backgroundColor: isAdd ? COLORS.primary : COLORS.gray,
      ...SHADOWS.small,
      borderRadius: SIZES.xxSmall,
      marginBottom: SIZES.xxSmall,
      padding: SIZES.xSmall,
      flexDirection: 'row',
    }
  },
})

export default storageStyles
