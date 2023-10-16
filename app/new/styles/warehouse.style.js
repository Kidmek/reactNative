import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.medium,
  },
  header: {
    paddingTop: SIZES.large,
    marginBottom: SIZES.medium,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
  },
  headerMsg: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    marginBottom: SIZES.large,
  },
  inputWrapper: {
    gap: SIZES.small,
  },
  imagesWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    gap: SIZES.medium,
  },
  minusIcon: {
    position: 'relative',
    top: 0,
    right: 0,
    marginEnd: SIZES.large,
  },
  image: {
    height: SIZES.smallPicture,
    width: SIZES.smallPicture,
  },
  inputLabel: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  input: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    marginBottom: SIZES.medium,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: SIZES.xxLarge,
    paddingBottom: SIZES.xLarge,
    gap: SIZES.small,
  },
  btn: {
    borderRadius: SIZES.large,
  },
  dropDownItemContainer: {
    padding: SIZES.small,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropDownText: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: SIZES.largePicture,
  },
  imageInputWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dateIcon: {
    position: 'absolute',
    right: '3.5%',
    top: '12%',
  },
})

export default styles
