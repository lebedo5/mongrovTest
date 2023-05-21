import React from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../text/text';
import { fontSize, size } from '../../utils/size';
import { BackIcon } from "../../assets/icons/back-icon"
import { palette } from "../../theme/palette"
import { useNavigation } from "@react-navigation/native"

const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: 'center' };
const RIGHT: ViewStyle = { width: size(32) };
export const HeaderHeight = size(48);
const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: palette.white,
      paddingHorizontal: size(19)
    },
    title: {
      fontSize: fontSize(24),
      fontWeight: 'bold',
      lineHeight: size(30.12),
      textAlign: 'center'
    },
  });
export interface HeaderProps {
  /**
   * Title
   */
  headerText: string
  /**
   * Icon that should appear on the left
   */
  leftIcon?: any;
  /**
   * Container style overrides.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Title style overrides.
   */
  titleStyle?: StyleProp<TextStyle>;

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void;
}

export function Header(props: HeaderProps) {
  const {
    headerText,
    titleStyle,
    style,
  } = props;
  const navigation = useNavigation()
  const header = headerText || '';

  const { top } = useSafeAreaInsets();

  const headerTopSpacing = top || size(16);

  const headerStyles = Object.assign({}, styles.root, style);

  const onLeftPress = () => {
    if(navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  return (
    <View style={[headerStyles, { paddingTop: headerTopSpacing, height: size(48) + headerTopSpacing }]}>
      <Pressable hitSlop={15} onPress={onLeftPress}>
        <BackIcon />
      </Pressable>
      <View style={TITLE_MIDDLE}>
        <Text style={[styles.title, titleStyle]} text={header} />
      </View>
      <View style={RIGHT} />
    </View>
  );
}
