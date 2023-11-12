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
  input: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    marginBottom: SIZES.medium,
    textAlignVertical: 'top',
  },
  dateIcon: {
    position: 'absolute',
    right: '3.5%',
    top: '12%',
  },
})

export default styles
