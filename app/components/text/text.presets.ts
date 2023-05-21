import { TextStyle } from 'react-native';
import { fontSize } from '../../utils/size';
import { colors } from "../../theme"

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = () => {
  const BASE: TextStyle = {
    color: colors.text,
    fontSize: fontSize(14),
    fontWeight: '400',
  };
  return {
    default: BASE,
    bold: { ...BASE, fontWeight: 'bold' } as TextStyle,
    header: { ...BASE, fontSize: fontSize(22), fontWeight: '800' } as TextStyle,
    fieldLabel: { ...BASE, fontSize: fontSize(13) } as TextStyle,
    secondary: { ...BASE, fontSize: fontSize(12) } as TextStyle,
  };
};

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets;
