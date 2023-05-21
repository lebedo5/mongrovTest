import React from "react"
import {
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { Text } from "../text/text"
import { palette } from "../../theme/palette"
import { fontSize, size } from "app/utils/size"
export interface ButtonProps {
  text?: string;

  onPress?(): void
}

export function Button({
    text,
    onPress,
  }: ButtonProps) {

  const styles = fromStyles()

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.buttonContainer}>
      <Text text={text} style={ styles.textStyle} />
    </TouchableOpacity>
  )
}

const fromStyles = () =>
  StyleSheet.create({
    buttonContainer:{
      backgroundColor: palette.iconColor,
      borderRadius: size(34),
      paddingHorizontal: size(15),
      paddingVertical: size(10),
      justifyContent: "center",
      alignItems: "center"
    },
    textStyle: {
      fontSize:fontSize(16),
      color: palette.lightGray2,
      lineHeight: size(20),
      fontWeight: "700"
    }
  })
