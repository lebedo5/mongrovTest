import Svg, { Circle, Path, G, Defs, ClipPath, Rect } from "react-native-svg"
import { size } from "../../utils/size"
import { palette } from "../../theme/palette"


export const MoreIcon = ({ width = size(36), height = size(35) }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0_5701_9539)">
        <Circle cx="18" cy="17.5" r="16.0417" stroke={palette.iconColor} strokeWidth={size(2.91667)}/>
        <Path d="M18.0002 18.5931C18.7049 18.5931 19.2762 18.0218 19.2762 17.3171C19.2762 16.6123 18.7049 16.041 18.0002 16.041C17.2954 16.041 16.7241 16.6123 16.7241 17.3171C16.7241 18.0218 17.2954 18.5931 18.0002 18.5931Z" stroke={palette.iconColor} strokeWidth={size(2.55208)} strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M26.9323 18.5931C27.637 18.5931 28.2083 18.0218 28.2083 17.3171C28.2083 16.6123 27.637 16.041 26.9323 16.041C26.2276 16.041 25.6562 16.6123 25.6562 17.3171C25.6562 18.0218 26.2276 18.5931 26.9323 18.5931Z" stroke={palette.iconColor}  strokeWidth={size(2.55208)} strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M9.06755 18.5931C9.77228 18.5931 10.3436 18.0218 10.3436 17.3171C10.3436 16.6123 9.77228 16.041 9.06755 16.041C8.36281 16.041 7.7915 16.6123 7.7915 17.3171C7.7915 18.0218 8.36281 18.5931 9.06755 18.5931Z" stroke={palette.iconColor}  strokeWidth={size(2.55208)} strokeLinecap="round" strokeLinejoin="round"/>
      </G>
      <Defs>
        <ClipPath id="clip0_5701_9539">
          <Rect width={width} height={height} fill={palette.white} transform="translate(0.5)"/>
        </ClipPath>
      </Defs>
    </Svg>
  )
}
