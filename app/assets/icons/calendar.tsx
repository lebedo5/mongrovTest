import Svg, { Path } from "react-native-svg"
import { size } from "../../utils/size"
import { palette } from "../../theme/palette"

export const CalendarIcon = ({ width = size(24), height = size(24) }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke={palette.iconColor} strokeWidth={size(2)} strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M16 2V6" stroke={palette.iconColor} strokeWidth={size(2)} strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M8 2V6" stroke={palette.iconColor} strokeWidth={size(2)} strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M3 10H21" stroke={palette.iconColor} strokeWidth={size(2)} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}
