import Svg, { Path } from "react-native-svg"
import { size } from "../../utils/size"
import { palette } from "../../theme/palette"

export const RightIcon = ({ width = size(24), height = size(24), color = palette.iconColor }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M9.92671 7.03779L16.0002 12.9633L10.0747 19.0369" stroke={color} strokeWidth={size(2)} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}
