import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFFF',
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONT.bold,
  },
  btnIcon: {
    position: 'absolute',
    left: 16,
  },
  footer: {
    position: 'absolute',
    height: 80,
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: COLORS.pureWhite,
    paddingHorizontal: 20,
    borderTopColor: COLORS.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  inputFooter: {
    alignSelf: 'flex-end',
    height: 80,
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  additionalTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    textAlign: 'center',
    marginVertical: SIZES.medium,
  },
})
