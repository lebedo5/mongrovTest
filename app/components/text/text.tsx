import * as React from 'react';
import { StyleProp, Text as ReactNativeText, TextStyle } from "react-native"
import { presets, TextPresets } from "./text.presets"
import { colors } from "../../theme"
import { fontSize } from "../../utils/size"

export interface TextProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string | number;

  style?: StyleProp<TextStyle>;

  /**
   * One of the different types of text presets.
   */
  preset?: TextPresets | string;
  adjustsFontSizeToFit: number | any;
  children: React.ReactNode
}
const BASE: TextStyle = {
  color: colors.palette.textColor,
  fontSize: fontSize(14),
  fontWeight: '400',
};
export function Text(props: TextProps) {
  const {
    preset = 'default',
    text,
    style: styleOverride,
    adjustsFontSizeToFit,
    children,
    ...rest
  } = props;
  const content = children ? children : text;

  const style = presets()[preset] || presets().default;

  const styles = [BASE, styleOverride];

  return (
    <ReactNativeText adjustsFontSizeToFit={adjustsFontSizeToFit} {...rest} style={styles}>
      {content}
    </ReactNativeText>
  );
}
