import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg"
import { size } from "../../utils/size"
import { palette } from "../../theme/palette"


export const SearchIcon = ({ width = size(36), height = size(35) }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0_5701_9526)">
        <Path d="M30.8919 6.72363C30.1471 5.97842 29.2627 5.38728 28.2893 4.98396C27.3159 4.58064 26.2726 4.37305 25.219 4.37305C24.1654 4.37305 23.1221 4.58064 22.1487 4.98396C21.1753 5.38728 20.2909 5.97842 19.5461 6.72363L18.0003 8.26946L16.4544 6.72363C14.9499 5.21907 12.9093 4.37383 10.7815 4.37383C8.65375 4.37383 6.61314 5.21907 5.10859 6.72363C3.60404 8.22818 2.75879 10.2688 2.75879 12.3965C2.75879 14.5243 3.60404 16.5649 5.10859 18.0695L6.65442 19.6153L18.0003 30.9611L29.3461 19.6153L30.8919 18.0695C31.6371 17.3246 32.2283 16.4402 32.6316 15.4669C33.0349 14.4935 33.2425 13.4502 33.2425 12.3965C33.2425 11.3429 33.0349 10.2996 32.6316 9.32623C32.2283 8.35285 31.6371 7.46848 30.8919 6.72363V6.72363Z" stroke={palette.iconColor} strokeWidth={size(2.91667)} strokeLinecap="round" strokeLinejoin="round" />
      </G>
      <Defs>
        <ClipPath id="clip0_5701_9526">
          <Rect width={width} height={height} fill={palette.white} transform="translate(0.5)"/>
        </ClipPath>
      </Defs>
    </Svg>

  )
}
