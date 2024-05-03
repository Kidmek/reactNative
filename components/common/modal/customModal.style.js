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
    backgroundColor: COLORS.red,
  },
  acceptBtn: {
    backgroundColor: COLORS.green,
  },
  neutralBtn: {
    backgroundColor: COLORS.gray,
  },
  btn: {
    flex: 1,
    paddingHorizontal: SIZES.xSmall,
    paddingVertical: SIZES.xSmall,
    borderRadius: SIZES.small,
  },
  driverBtn: {
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.small,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SIZES.small,
  },
  btnContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    gap: SIZES.xxLarge,
  },
  mapContainer: {
    // borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    borderRadius: SIZES.medium,
    marginBottom: SIZES.medium,
  },
  info: {
    paddingHorizontal: SIZES.small,
    marginBottom: SIZES.xxLarge,
  },
  // Logout

  textContainer: {
    gap: SIZES.large,
  },
  modalHeader: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
  },
  logoutText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
  },
  logoutContainer: {
    alignItems: 'flex-start',
    gap: SIZES.xxLarge,
  },
})

export default styles
