import Svg, { Path, G, Circle, Defs, ClipPath, Rect } from "react-native-svg"
import { size } from "../../utils/size"
import { palette } from "../../theme/palette"


export const CheckIcon = ({ width = size(20), height = size(20) }) => {
  return (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G clipPath="url(#clip0_5722_15168)">
      <G clipPath="url(#clip1_5722_15168)">
        <Circle cx={size(10)} cy={size(10)} r={size(6)} fill={palette.lightPurple} />
        <Path d="M20 9.99989L17.7359 7.48616L18.0904 4.12092L14.7797 3.42003L13.0909 0.486328L10 1.8677L6.9091 0.486328L5.22032 3.42003L1.90964 4.12092L2.26409 7.48616L0 9.99989L2.26405 12.5136L1.9096 15.8789L5.22028 16.5798L6.90906 19.5135L9.99998 18.132L13.0909 19.5135L14.7797 16.5798L18.0904 15.8789L17.7359 12.5136L20 9.99989ZM14.1922 7.81031L9.17264 13.434L5.68456 9.94596L6.5142 9.11632L9.12419 11.7263L13.3169 7.029L14.1922 7.81031Z" fill={palette.purple} />
      </G>
    </G>
    <Defs>
      <ClipPath id="clip0_5722_15168">
        <Rect width={width} height={height} fill={palette.white} />
      </ClipPath>
      <ClipPath id="clip1_5722_15168">
        <Rect width={width} height={height}  fill={palette.white} />
      </ClipPath>
    </Defs>
  </Svg>

)
}
