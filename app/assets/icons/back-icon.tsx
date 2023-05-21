import Svg, { Path } from "react-native-svg"
import { size } from "../../utils/size"
import { palette } from "../../theme/palette"

export const BackIcon = ({ width = size(24), height = size(24), color = palette.iconColor }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth={size(2)} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}
