const COLORS = {
  primary: '#312651',
  secondary: '#444262',
  tertiary: '#FF7754',

  gray: '#83829A',
  gray2: '#C1C0C8',

  green: '#008000',

  white: '#F3F4F8',
  lightWhite: '#FAFAFC',

  red: '#EF4444',
}

const FONT = {
  regular: 'DMRegular',
  medium: 'DMMedium',
  bold: 'DMBold',
}

const SIZES = {
  xxSmall: 6,
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  smallPicture: 80,
  mediumPicture: 100,
  largePicture: 120,
}

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
}

export { COLORS, FONT, SIZES, SHADOWS }
