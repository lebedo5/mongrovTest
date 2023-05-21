import * as React from "react"
import { StyleProp, TextInput, TextStyle, View, ViewStyle, StyleSheet, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/text/text"
import { palette } from "../../theme/palette"
import { fontSize, size } from "../../utils/size"

export interface InputProps {
  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string;
  label?: string;

  labelStyle?: StyleProp<TextStyle>;
  /**
   * Optional icon accepts components not object
   */
  icon?: React.ReactNode | null;

  /**
   * Optional icon container style overrides useful for margin, padding and icon position.
   */
  iconContainer?: StyleProp<ViewStyle>;

  /**
   * Optional label indicates the maximum length of the input text
   */
  maxLength?: number;

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>;

  /**
   * Various look & feels.
   */
  type?: 'input' | 'textarea';

  /**
   * Inactive input when disable exist and true
   */
  disabled?: boolean;

  onChange?: any;
  forwardedRef?: any;
  /**
   * Works when onPressIcon exist and after click on the icon
   */
  onPressIcon?: () => void
  value: any
}

export const Input = observer(function Input({
     placeholder = '',
     style: styleOverride,
     inputStyle: inputStyleOverride,
     forwardedRef,
     maxLength,
     disabled,
     onChange,
     label,
     labelStyle,
     value = '',
     icon = null,
     onPressIcon,
     ...rest
   }: InputProps) {
  const styles = fromStyles();
  const inputStyles = StyleSheet.flatten([styles.input, inputStyleOverride]);

  const containerStyles = [styleOverride];

  return (
    <View style={containerStyles}>
      <View style={styles.center}>
        {label && <Text style={labelStyle} text={label} />}
        <View style={{ flexDirection: "row", alignItems: "center", position: "relative" }}>
          <TextInput
            defaultValue={value}
            placeholder={placeholder}
            placeholderTextColor={palette.separatorTextColor}
            underlineColorAndroid={'transparent'}
            {...rest}
            value={value}
            style={inputStyles}
            ref={forwardedRef}
            allowFontScaling={false}
            maxLength={maxLength}
            editable={!disabled}
            onChangeText={onChange}
          />
          <Pressable onPress={onPressIcon} style={styles.iconBlock}>
            {icon || null}
          </Pressable>
        </View>
      </View>
    </View>
  )
})
const fromStyles = () =>
  StyleSheet.create({
    center: { justifyContent: 'center' },
    input: {
      color: palette.textColor,
      fontSize: fontSize(16),
      paddingVertical: size(1),
      paddingHorizontal: size(0)
    },
    iconBlock: {
      position: "absolute", right: size(-26)
    }
  })
