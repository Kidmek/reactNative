import { Dimensions, StyleSheet } from 'react-native'
import { COLORS, SIZES, SHADOWS, FONT } from '../../constants'

const messageStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.pureWhite,
  },
  messageWrapper: (seen) => {
    return {
      flexDirection: 'row',
      gap: SIZES.small,
      backgroundColor: seen ? 'transparent' : COLORS.primary + '22',
      borderRadius: SIZES.small,
      paddingVertical: SIZES.small,
      paddingHorizontal: SIZES.medium,
      marginBottom: SIZES.small,
    }
  },
  singleImgMsg: (isOwn) => {
    return {
      flexDirection: 'column',
      gap: SIZES.small,
      borderRadius: SIZES.xxLarge,
      position: 'relative',
      alignSelf: isOwn ? 'flex-start' : 'flex-end',
    }
  },
  singleMsg: (isOwn) => {
    return {
      flexDirection: 'row',
      gap: SIZES.small,
      backgroundColor: isOwn ? COLORS.secondary + '55' : COLORS.primary + '55',
      borderRadius: SIZES.xxLarge,
      borderBottomLeftRadius: isOwn ? 0 : SIZES.xxLarge,
      borderBottomRightRadius: !isOwn ? 0 : SIZES.xxLarge,
      paddingVertical: SIZES.small,
      paddingHorizontal: SIZES.medium,
      position: 'relative',
      alignSelf: isOwn ? 'flex-start' : 'flex-end',
      maxWidth: Dimensions.get('screen').width * 0.7,
    }
  },
  singleMsgEdge: {
    position: 'absolute',
    width: SIZES.medium,
    height: SIZES.medium * 2,
    backgroundColor: COLORS.primary + '55',
    bottom: 0,
    left: -SIZES.medium,
    zIndex: -100,
    borderTopLeftRadius: 10000,
  },
  singleMsgTopEdge: {
    position: 'absolute',
    width: SIZES.xxLarge,
    height: SIZES.large * 2,
    backgroundColor: COLORS.pureWhite,
    top: 0,
    left: -SIZES.medium,
    zIndex: -100,
    borderBottomRightRadius: 10000,
  },
  textWrapper: {},
  content: (seen) => {
    return {
      fontFamily: seen ? FONT.medium : FONT.bold,
    }
  },
  date: {
    fontFamily: FONT.regular,
  },
  // texts
  name: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
    textTransform: 'capitalize',
  },
  type: {
    fontSize: SIZES.small + 2,
    fontFamily: FONT.regular,
    color: COLORS.grey,
    marginTop: 3,
    textTransform: 'capitalize',
  },
  middle: {
    fontSize: SIZES.small + 2,
    fontFamily: FONT.regular,
    color: COLORS.black,
    marginTop: 3,
    textTransform: 'capitalize',
  },
  inputStyle: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: SIZES.medium,
    borderColor: COLORS.gray,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.medium,
    flex: 1,
  },
  inputContainer: {
    backgroundColor: COLORS.pureWhite,
    position: 'absolute',
    bottom: 0,
    gap: SIZES.medium,
    marginHorizontal: SIZES.medium,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.small,
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
  messageBtm: {},
  iconContainer: (disabled) => {
    return {
      backgroundColor: disabled ? COLORS.gray : COLORS.primary,
      alignItems: 'center',
      justifyContent: 'center',
      padding: SIZES.small,
      borderRadius: 1000,
      // transform: [{ rotate: '-25deg' }],
    }
  },
})

export default messageStyles
