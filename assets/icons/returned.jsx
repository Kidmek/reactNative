import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
const ReturnedSVG = ({ color, size }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    stroke={color}
    strokeWidth={1.5}
    className='w-6 h-6 text-blue-500'
    viewBox='0 0 24 24'
    height={size}
    width={size}
  >
    <Path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185z'
    />
  </Svg>
)
export default ReturnedSVG
