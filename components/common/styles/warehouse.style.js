import { Dimensions, StyleSheet } from 'react-native'
import { COLORS, FONT, SHADOWS, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.medium,
    backgroundColor: COLORS.pureWhite,
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
    height: SIZES.xLargePicture,
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
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
  mainImage: {
    height: SIZES.largePicture,
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
    height: Dimensions.get('screen').height * 0.5,
  },

  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  name: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  subName: {
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  type: {
    fontSize: SIZES.small + 2,
    fontFamily: 'DMRegular',
    color: COLORS.gray,
    marginTop: 3,
    textTransform: 'capitalize',
  },

  resourcesHeader: {
    flexDirection: 'row',
    marginTop: SIZES.large,
    justifyContent: 'space-around',
  },
  resContainer: {
    flexDirection: 'row',
    gap: SIZES.xSmall,
    justifyContent: 'space-around',
  },

  btnText: {
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  headerBtn: {
    marginVertical: SIZES.small,
    flexDirection: 'row',
    marginBottom: SIZES.xSmall,
    gap: SIZES.small,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    paddingVertical: SIZES.xxSmall,
    paddingHorizontal: SIZES.xSmall,
    width: 'fit-content',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.small,
    flexDirection: 'row',
    gap: SIZES.small,
    borderRadius: SIZES.small,
    alignItems: 'center',
  },
  headerBtnTxt: {
    fontFamily: FONT.medium,
    color: COLORS.white,
  },
  detailsTextBtn: {
    color: COLORS.primary,
    fontFamily: FONT.regular,
  },
  removeTextBtn: {
    color: COLORS.tertiary,
    fontFamily: FONT.regular,
  },
  actionBtns: {
    alignItems: 'flex-end',
    gap: SIZES.xSmall,
  },
  tableBoldCell: {
    fontFamily: FONT.bold,
  },
  tableNormalCells: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    flexWrap: 'wrap-reverse',
  },
  activityIndicator: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.grey,
    marginVertical: 16,
  },
  onlyTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    backgroundColor: COLORS.pureWhite,
  },
})

export default styles
