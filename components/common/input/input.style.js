import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES, SHADOWS } from '../../../constants'

const styles = StyleSheet.create({
  inputWrapper: {
    gap: SIZES.small,
  },

  inputLabel: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  input: (error, allBorder) => {
    return {
      borderWidth: allBorder ? 1 : 0,
      borderBottomWidth: 1,
      borderRadius: allBorder ? SIZES.medium : 0,
      borderColor: !error ? COLORS.gray2 : COLORS.red,
      fontFamily: FONT.medium,
      paddingTop: allBorder ? 0 : SIZES.small,
      paddingVertical: allBorder ? SIZES.small : 0,
      paddingHorizontal: SIZES.medium,
      color: COLORS.black,
      textAlignVertical: 'top',
      marginTop: SIZES.xSmall,
      marginBottom: SIZES.small,
      backgroundColor: COLORS.gray3 + '2f',
    }
  },
  dateIcon: {
    position: 'absolute',
    right: '3.5%',
    top: '12%',
  },
  dimensionsInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SIZES.small,
  },
  inputError: {
    color: COLORS.red,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
  },
})

export default styles
