import * as React from "react"
import { View, StyleSheet, StatusBar } from "react-native"
import { observer } from "mobx-react-lite"
import { Profile } from "../../assets/bottom-nav-bar/profile"
import { SearchIcon } from "../../assets/bottom-nav-bar/search"
import { Logo } from "../../assets/bottom-nav-bar/logo"
import { NotificationIcon } from "../../assets/bottom-nav-bar/notification"
import { MoreIcon } from "../../assets/bottom-nav-bar/more"
import { palette } from "../../theme/palette"
import { size } from "app/utils/size"

const BottomNavBarIcons = [
  {
    title: "Profile",
    icon: <Profile />
  },
  {
    title: "Search",
    icon:  <SearchIcon />
  },
  {
    title: "MainPage",
    icon:  <Logo />
  },
  {
    title: "Notification",
    icon:  <NotificationIcon />
  },
  {
    title: "More",
    icon:  <MoreIcon />
  },
]
export const BottomNavBar = observer(function BottomNavBar() {
  const styles = fromStyle()

  return (
    <View style={styles.bottomNavBarBlock}>
      {BottomNavBarIcons.map((item, index) => (
        <View key={index.toString()}>
          {item.icon}
        </View>
      ))}
    </View>
  )
})

const fromStyle = () => StyleSheet.create({
  bottomNavBarBlock: {
    alignItems: "center",
    backgroundColor: palette.white,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: size(40),
    paddingVertical: size(16)
  }
})
