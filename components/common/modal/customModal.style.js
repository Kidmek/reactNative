import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: SIZES.large,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: SIZES.large,
    textAlign: 'center',
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
  },
  declineBtn: {
    backgroundColor: COLORS.gray,
  },
  acceptBtn: {
    backgroundColor: COLORS.primary,
  },
  btn: {
    flex: 1,
    paddingHorizontal: SIZES.xSmall,
    paddingVertical: SIZES.xSmall,
    borderRadius: SIZES.large,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SIZES.xxLarge,
  },
})

export default styles
