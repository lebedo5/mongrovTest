import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle, StyleSheet, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/text/text"
import { fontSize, size } from "../../utils/size"
import { palette } from "../../theme/palette"
import { Divider } from "../divider/divider"

export interface CheckboxProps {
  /**
   * Is the checkbox checked?
   */
  value?: boolean;

  /**
   * The text to display if there isn't a tx.
   */
  text?: string;


  /**
   * Fires when the user tabs to change the value.
   */
  onToggle?(): void;
}

/**
 * Describe your component here
 */
export const Checkbox = observer(function Checkbox({ onToggle, text, value }: CheckboxProps) {
  const styles = fromStyles();

  return (
    <Pressable hitSlop={20} onPress={onToggle} style={styles.container}>
      <View style={styles.buttonBlock}>
        <View style={value ? styles.activeCheckbox : null}/>
      </View>
      <Divider direction={"vertical"} size={8} />
      <Text style={styles.label} text={text} />
    </Pressable>
  )
})

const fromStyles = () =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    label: {
      color: palette.purple,
      fontSize: fontSize(20),
      fontWeight: "bold",
      lineHeight: size(25)
    },
    buttonBlock: {
      borderColor: palette.gray,
      borderWidth: size(2),
      height: size(24),
      width: size(24),
    },
    activeCheckbox: {
      backgroundColor: palette.purple,
      flex: 1,
      margin: size(1),
    }
  });

