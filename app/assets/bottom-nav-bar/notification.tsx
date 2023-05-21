import Svg, { Path } from "react-native-svg"
import { size } from "../../utils/size"
import { palette } from "../../theme/palette"


export const NotificationIcon = ({ width = size(36), height = size(35) }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M28.125 19.875C28.125 20.6485 27.8177 21.3904 27.2707 21.9374C26.7237 22.4844 25.9819 22.7917 25.2083 22.7917H7.70833L1.875 28.625V5.29167C1.875 4.51812 2.18229 3.77625 2.72927 3.22927C3.27625 2.68229 4.01812 2.375 4.79167 2.375H25.2083C25.9819 2.375 26.7237 2.68229 27.2707 3.22927C27.8177 3.77625 28.125 4.51812 28.125 5.29167V19.875Z" stroke={palette.iconColor} strokeWidth={size(2.91667)} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}
