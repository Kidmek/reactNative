import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const ProgressSVG = ({ color, size }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    aria-hidden='true'
    className='w-6 h-6 text-blue-500 dark:text-white'
    viewBox='0 0 18 16'
    height={size}
    width={size}
    stroke={color}
  >
    <Path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M1 1v14h16m0-9-3-2-3 5-3-2-3 4'
    />
  </Svg>
)
export default ProgressSVG
