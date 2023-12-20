import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const PortSVG = ({ color, size }) => {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      aria-hidden='true'
      className='w-6 h-6 text-blue-500 dark:text-white'
      viewBox='0 0 16 20'
      height={size}
      width={size}
    >
      <Path
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M1 1v18M1 3.652v9c5.6-5.223 8.4 2.49 14-.08v-9c-5.6 2.57-8.4-5.143-14 .08Z'
      />
    </Svg>
  )
}

export default PortSVG
