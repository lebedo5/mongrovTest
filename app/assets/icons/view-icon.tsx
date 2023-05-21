import Svg, { Path } from "react-native-svg"
import { size } from "../../utils/size"
import { palette } from "../../theme/palette"


export const ViewIcon = () => {
  return (
    <Svg width={size(12)} height={size(13)} viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M0.5 6.5C0.5 6.5 2.5 2.5 6 2.5C9.5 2.5 11.5 6.5 11.5 6.5C11.5 6.5 9.5 10.5 6 10.5C2.5 10.5 0.5 6.5 0.5 6.5Z" stroke={palette.separatorTextColor} strokeWidth={size(1)} strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M6 8C6.82843 8 7.5 7.32843 7.5 6.5C7.5 5.67157 6.82843 5 6 5C5.17157 5 4.5 5.67157 4.5 6.5C4.5 7.32843 5.17157 8 6 8Z" stroke={palette.separatorTextColor} strokeWidth={size(1)} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}
