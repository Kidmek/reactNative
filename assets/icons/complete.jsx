import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const CompleteSVG = ({ color, size }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    aria-hidden='true'
    className='w-6 h-6 text-blue-500 dark:text-white'
    viewBox='0 0 18 20'
    stroke={color}
    height={size}
    width={size}
  >
    <Path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='m6 9 2 3 5-5M9 19A18.55 18.55 0 0 1 1 4l8-3 8 3a18.549 18.549 0 0 1-8 15Z'
    />
  </Svg>
)
export default CompleteSVG
