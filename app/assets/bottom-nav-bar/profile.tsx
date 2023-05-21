import Svg, { Path } from "react-native-svg"
import { size } from "../../utils/size"
import { palette } from "../../theme/palette"

export const Profile = () => {
  return (
    <Svg width={size(30)} height={size(32)} viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M1.875 11.1257V1.64648H8.4375M1.875 11.1257V27.1673C1.875 27.9409 2.18229 28.6827 2.72927 29.2297C3.27625 29.7767 4.01812 30.084 4.79167 30.084H25.2083C25.9819 30.084 26.7237 29.7767 27.2707 29.2297C27.8177 28.6827 28.125 27.9409 28.125 27.1673V11.1257M1.875 11.1257H8.4375M28.125 11.1257V1.64648H21.5625M28.125 11.1257H21.5625M15 1.64648V11.1257M15 1.64648H8.4375M15 1.64648H21.5625M15 11.1257H8.4375M15 11.1257H21.5625M8.4375 1.64648V11.1257M21.5625 1.64648V11.1257" stroke={palette.iconColor} strokeWidth={size(2.91667)} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>

  )
}
