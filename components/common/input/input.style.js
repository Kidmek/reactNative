import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  inputWrapper: {
    gap: SIZES.small,
  },

  inputLabel: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  input: (error) => {
    return {
      borderWidth: 1,
      borderRadius: SIZES.medium,
      borderColor: !error ? COLORS.gray2 : COLORS.red,
      fontFamily: FONT.medium,
      paddingVertical: SIZES.small,
      paddingHorizontal: SIZES.medium,
      marginBottom: SIZES.medium,
      textAlignVertical: 'top',
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
})

export default styles
