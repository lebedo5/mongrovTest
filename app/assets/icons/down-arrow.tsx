import Svg, { Path } from "react-native-svg"
import { size } from "../../utils/size"
import { palette } from "../../theme/palette"

export const DownArrow = () => {
  return (
    <Svg width={size(24)} height={size(24)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M18 9L12 15L6 9" stroke={palette.iconColor} strokeWidth={size(2)} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}
